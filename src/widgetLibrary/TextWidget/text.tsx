import { FC, useEffect } from "react"
import { css } from "@emotion/react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TextProps } from "./interface"
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
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  } = props

  const alignCss = css`
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
  `

  const handleSetValue = (value: string) => {
    handleUpdateDsl({ value })
  }

  const handleClearValue = () => {
    handleUpdateDsl({ value: undefined })
  }

  useEffect(() => {
    if (!displayName) return
    handleUpdateGlobalData(displayName, {
      value,
      disableMarkdown,
      horizontalAlign,
      verticalAlign,
      backgroundColor,
      textColor,
      linkColor,
      setValue: handleSetValue,
      clearValue: handleClearValue,
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

export const TextWidget = Text
