import { FC } from "react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TextProps } from "./interface"
import { applyTextCss, textContainerCss } from "./style"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const transLink: ShowdownExtension = {
  type: "output",
  regex: new RegExp(`<a href="(.*)"></a>`, "g"),
  replace: `<a  href='$1' >$1</a>`,
}

export const Text: FC<TextProps> = (props) => {
  const {
    value = `👏🏻 **welcome to illa-builder** <https://github.com/illa-family/illa-builder>`,
    disableMarkdown = false,
    horizontalAlign = "start",
    verticalAlign = "top",
    linkColor = globalColor(`--${illaPrefix}-blue-05`),
    backgroundColor,
    textColor = globalColor(`--${illaPrefix}-grayBlue-05`),
    ...res
  } = props

  const alignCss = css`
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
  `

  return (
    <div {...res} css={css(textContainerCss, alignCss)}>
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

Text.displayName = "Text"
