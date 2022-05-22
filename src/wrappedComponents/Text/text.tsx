import { FC } from "react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TextProps } from "./interface"
import { applyTextCss, textContainerCss } from "./style"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { withParser } from "../parserHOC"

const transLink: ShowdownExtension = {
  type: "output",
  regex: new RegExp(`<a href="(.*)"></a>`, "g"),
  replace: `<a  href='$1' >$1</a>`,
}

export const Text: FC<TextProps> = (props: TextProps) => {
  const {
    value = "This is a text",
    disableMarkdown = false,
    horizontalAlign = "start",
    verticalAlign = "start",
    linkColor = globalColor(`--${illaPrefix}-blue-05`),
    backgroundColor = "",
    textColor = globalColor(`--${illaPrefix}-grayBlue-05`),
  } = props

  const alignCss = css`
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
  `

  return (
    <div css={css(textContainerCss, alignCss)}>
      {disableMarkdown ? (
        <MarkdownView
          css={css`
            ${applyTextCss(textColor, linkColor)}, ${alignCss}
          `}
          markdown={value}
          extensions={[transLink]}
        />
      ) : (
        <div css={applyTextCss(textColor)}>{value}</div>
      )}
    </div>
  )
}

Text.displayName = "TextWidget"

export const TextWidget = withParser(Text)
