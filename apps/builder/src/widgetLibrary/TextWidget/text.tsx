import { FC, useEffect, useLayoutEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { Text as ILLAText, Link, Paragraph } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"
import { TextProps, TextWidgetProps } from "./interface"
import {
  applyAlignStyle,
  applyAutoHeightContainerStyle,
  applyContainerStyle,
  applyMarkdownStyle,
  applyTextStyle,
} from "./style"

const MarkdownContainer: FC<any> = ({ children, colorScheme }) => {
  return <div css={applyContainerStyle(colorScheme)}>{children}</div>
}

export const Text: FC<TextProps> = (props) => {
  const {
    value,
    horizontalAlign,
    verticalAlign,
    colorScheme,
    fs,
    disableMarkdown,
  } = props

  const sanitizeOptions = {
    allowedTags: HTMLTags,
  }

  return (
    <div css={applyAlignStyle(verticalAlign)}>
      {disableMarkdown ? (
        <ILLAText
          css={applyTextStyle(horizontalAlign)}
          colorScheme={colorScheme}
          fs={fs}
        >
          {value}
        </ILLAText>
      ) : (
        <MarkdownContainer colorScheme={colorScheme}>
          <ReactMarkdown
            css={applyMarkdownStyle(horizontalAlign)}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeOptions]]}
            components={{
              a: ({ href, children }) => (
                <Link href={href} target="_blank" colorScheme={colorScheme}>
                  {children}
                </Link>
              ),
              p: ({ children }) => (
                <Paragraph fs={fs} colorScheme={colorScheme}>
                  {children}
                </Paragraph>
              ),
            }}
          >
            {value ?? ""}
          </ReactMarkdown>
        </MarkdownContainer>
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
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    updateComponentHeight,
    disableMarkdown,
    tooltipText,
    dynamicHeight = "fixed",
    dynamicMinHeight,
    dynamicMaxHeight,
    colorScheme,
    fs,
    fw,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleUpdateDsl,
    updateComponentRuntimeProps,
  ])

  const enableAutoHeight =
    dynamicHeight !== "fixed" && dynamicHeight != undefined

  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const containerDOM = containerRef.current
    const observerRef = new ResizeObserver((entries) => {
      if (!updateComponentHeight) return
      const height = entries[0].contentRect.height
      updateComponentHeight?.(height)
    })
    if (observerRef && containerDOM && enableAutoHeight) {
      observerRef.unobserve(containerDOM)
      observerRef.observe(containerDOM)
    }

    return () => {
      if (containerDOM && enableAutoHeight) {
        observerRef.unobserve(containerDOM)
      }
    }
  }, [enableAutoHeight, updateComponentHeight])

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
          fw={fw}
          disableMarkdown={disableMarkdown}
        />
      </div>
    </TooltipWrapper>
  )
}

TextWidget.displayName = "TextWidget"
export default TextWidget
