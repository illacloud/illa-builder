import { FC, useEffect } from "react"
import { TextProps, TextWidgetProps } from "./interface"
import { Paragraph, Text as ILLAText } from "@illa-design/typography"
import { applyAlignStyle } from "./style"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Link } from "@illa-design/link"

export const Text: FC<TextProps> = props => {
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
        <ILLAText colorScheme={colorScheme} fs={fs}>
          {value}
        </ILLAText>
      ) : (
        <ReactMarkdown
          children={value ?? ""}
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
        />
      )}
    </div>
  )
}

Text.displayName = "Text"

export const TextWidget: FC<TextWidgetProps> = props => {
  const {
    value,
    horizontalAlign,
    verticalAlign,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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
  }, [displayName, value, horizontalAlign, verticalAlign])
  return <Text {...props} />
}

TextWidget.displayName = "TextWidget"
