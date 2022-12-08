import { FC, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Text as ILLAText, Link, Paragraph } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { TextProps, TextWidgetProps } from "./interface"
import {
  applyAlignStyle,
  fullWidthAndFullHeightStyle,
  textStyle,
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
    <div css={applyAlignStyle(horizontalAlign, verticalAlign)}>
      {disableMarkdown ? (
        <ILLAText css={textStyle} colorScheme={colorScheme} fs={fs}>
          {value}
        </ILLAText>
      ) : (
        <ReactMarkdown
          css={textStyle}
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
    verticalAlign,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
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
  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullWidthAndFullHeightStyle}>
        <Text {...props} />
      </div>
    </TooltipWrapper>
  )
}

TextWidget.displayName = "TextWidget"
