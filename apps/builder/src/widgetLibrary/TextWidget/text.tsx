import { FC, useEffect, useLayoutEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import {
  Heading,
  Text as ILLAText,
  Link,
  Paragraph,
  Typography,
} from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"
import { TextProps, TextWidgetProps } from "./interface"
import {
  applyAlignStyle,
  applyAutoHeightContainerStyle,
  applyMarkdownStyle,
  applyTextStyle,
} from "./style"

export const Text: FC<TextProps> = (props) => {
  const {
    value,
    horizontalAlign,
    verticalAlign,
    colorScheme,
    fs,
    disableMarkdown,
    weight,
  } = props

  const sanitizeOptions = {
    allowedTags: HTMLTags,
  }

  return (
    <div css={applyAlignStyle(verticalAlign)}>
      {disableMarkdown ? (
        <ILLAText
          css={applyTextStyle(horizontalAlign, weight)}
          colorScheme={colorScheme}
          fs={fs}
        >
          {value}
        </ILLAText>
      ) : (
        <Typography w="100%">
          <ReactMarkdown
            css={applyMarkdownStyle(horizontalAlign)}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeOptions]]}
            components={{
              a: ({ href, children }) => (
                <Link href={href} target="_blank">
                  {children}
                </Link>
              ),
              p: ({ children }) => <Paragraph>{children}</Paragraph>,
              h1: ({ children }) => <Heading level="h1">{children}</Heading>,
              h2: ({ children }) => <Heading level="h2">{children}</Heading>,
              h3: ({ children }) => <Heading level="h3">{children}</Heading>,
              h4: ({ children }) => <Heading level="h4">{children}</Heading>,
              h5: ({ children }) => <Heading level="h5">{children}</Heading>,
              h6: ({ children }) => <Heading level="h6">{children}</Heading>,
            }}
          >
            {value ?? ""}
          </ReactMarkdown>
        </Typography>
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
    weight,
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
          weight={weight}
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
