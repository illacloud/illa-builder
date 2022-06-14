import { FC } from "react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TextProps } from "./interface"
import { applyTextCss, textContainerCss } from "./style"
import { css } from "@emotion/react"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"

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
    linkColor = "blue",
    backgroundColor = "transparent",
    textColor = "grayBlue",
    tooltipText,
  } = props

  const alignCss = css`
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
  `

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      position="tl"
      disabled={!tooltipText}
    >
      <div css={css(textContainerCss, alignCss)}>
        {disableMarkdown ? (
          <MarkdownView
            css={css`
              ${applyTextCss(
                textColor,
                linkColor,
                backgroundColor,
              )}, ${alignCss}
            `}
            markdown={value}
            extensions={[transLink]}
          />
        ) : (
          <div css={applyTextCss(textColor)}>{value}</div>
        )}
      </div>
    </TooltipWrapper>
  )
}

Text.displayName = "TextWidget"

export const TextWidget = Text
