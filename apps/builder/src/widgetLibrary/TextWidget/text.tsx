import { FC, useEffect, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Text as ILLAText, Link, Paragraph } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { useAutoUpdateHeight } from "@/widgetLibrary/PublicSector/utils/autoUpdateHeight"
import { TextProps, TextWidgetProps } from "./interface"
import {
  applyAlignStyle,
  applyAutoHeightContainerStyle,
  applyMarkdownStyle,
} from "./style"

export const Text: FC<TextProps> = (props) => {
  const {
    value,
    horizontalAlign,
    verticalAlign,
    colorScheme,
    fs,
    disableMarkdown,
  } = props

  return (
    <div css={applyAlignStyle(verticalAlign)}>
      {disableMarkdown ? (
        <ILLAText
          css={applyMarkdownStyle(horizontalAlign)}
          colorScheme={colorScheme}
          fs={fs}
        >
          {value}
        </ILLAText>
      ) : (
        <ReactMarkdown
          css={applyMarkdownStyle(horizontalAlign)}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <Link href={props.href} colorScheme={colorScheme} target="_blank">
                {props.children}
              </Link>
            ),
            p: ({ children, ...props }) => (
              <Paragraph colorScheme={colorScheme} fs={fs}>
                {children}
              </Paragraph>
            ),
          }}
        >
          {value ?? ""}
        </ReactMarkdown>
      )}
    </div>
  )
}

Text.displayName = "Text"

export const TextWidget: FC<TextWidgetProps> = (props) => {
  const {
    value,
    horizontalAlign,
    verticalAlign = "start",
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
    disableMarkdown,
    tooltipText,
    dynamicHeight = "fixed",
    dynamicMinHeight,
    dynamicMaxHeight,
    colorScheme,
    fs,
    h = 0,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      horizontalAlign,
      verticalAlign,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    horizontalAlign,
    verticalAlign,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  const dynamicOptions = useMemo(() => {
    return dynamicHeight === "fixed"
      ? {
          dynamicMinHeight,
          dynamicMaxHeight,
        }
      : undefined
  }, [dynamicHeight, dynamicMaxHeight, dynamicMinHeight])

  const [containerRef] = useAutoUpdateHeight(
    updateComponentHeight,
    enableAutoHeight,
    dynamicOptions,
  )

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div
        ref={containerRef}
        css={applyAutoHeightContainerStyle(
          dynamicHeight,
          dynamicMinHeight,
          dynamicMaxHeight,
        )}
      >
        <Text
          horizontalAlign={horizontalAlign}
          value={value}
          verticalAlign={verticalAlign}
          colorScheme={colorScheme}
          fs={fs}
          disableMarkdown={disableMarkdown}
        />
      </div>
    </TooltipWrapper>
  )
}

TextWidget.displayName = "TextWidget"
