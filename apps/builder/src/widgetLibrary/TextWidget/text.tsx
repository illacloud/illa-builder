import { FC, useEffect } from "react"
import { TextProps, TextWidgetProps } from "./interface"
import { Text as ILLAText } from "@illa-design/typography"
import { applyAlignStyle } from "./style"
import ReactMarkdown from "react-markdown"

export const Text: FC<TextProps> = (props) => {
  const {
    value,
    horizontalAlign,
    verticalAlign,
    colorScheme,
    fontSize,
    disableMarkdown,
  } = props

  return (
    <div css={applyAlignStyle(horizontalAlign, verticalAlign)}>
      {disableMarkdown ? (
        <ILLAText colorScheme={colorScheme} fontSize={fontSize}>
          {value}
        </ILLAText>
      ) : (
        <ReactMarkdown children={value ?? ""} />
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
