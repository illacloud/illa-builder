import { FC, useEffect } from "react"
import { css } from "@emotion/react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TextProps, TextWidgetProps } from "./interface"
import { applyTextContainerStyle, applyTextStyle } from "./style"

const transLink: ShowdownExtension = {
  type: "output",
  regex: new RegExp(`<a href="(.*)"></a>`, "g"),
  replace: `<a  href='$1' >$1</a>`,
}

export const Text: FC<TextProps> = (props) => {
  const {
    value,
    disableMarkdown,
    horizontalAlign,
    verticalAlign,
    backgroundColor,
    textColor,
    linkColor,
  } = props

  const alignCss = css`
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
  `

  return (
    <div css={css(applyTextContainerStyle(horizontalAlign, verticalAlign))}>
      {disableMarkdown ? (
        <MarkdownView
          css={css`
            ${applyTextStyle(
              textColor,
              linkColor,
              backgroundColor ?? "transparent",
            )}, ${alignCss}
          `}
          markdown={value ?? ""}
          extensions={[transLink]}
        />
      ) : (
        <div css={applyTextStyle(textColor)}>{value}</div>
      )}
    </div>
  )
}

Text.displayName = "TextWidget"

export const TextWidget: FC<TextWidgetProps> = (props) => {
  const {
    value,
    disableMarkdown,
    horizontalAlign,
    verticalAlign,
    backgroundColor,
    textColor,
    linkColor,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      disableMarkdown,
      horizontalAlign,
      verticalAlign,
      backgroundColor,
      textColor,
      linkColor,
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
    disableMarkdown,
    horizontalAlign,
    verticalAlign,
    backgroundColor,
    textColor,
    linkColor,
  ])
  return <Text {...props} />
}
