import { forwardRef } from "react"
import { css } from "@emotion/react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { TextProps } from "./interface"
import { applyTextCss, textContainerCss } from "./style"

const transLink: ShowdownExtension = {
  type: "output",
  regex: new RegExp(`<a href="(.*)"></a>`, "g"),
  replace: `<a  href='$1' >$1</a>`,
}

export const Text = forwardRef<any, TextProps>((props, ref) => {
  const {
    value,
    disableMarkdown,
    horizontalAlign,
    verticalAlign,
    styles,
    tooltipText,
  } = props

  console.log("styles", styles)
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
                styles?.textColor,
                styles?.linkColor,
                styles?.backgroundColor ?? "transparent",
              )}, ${alignCss}
            `}
            markdown={value ?? ""}
            extensions={[transLink]}
          />
        ) : (
          <div css={applyTextCss(styles?.textColor)}>{value}</div>
        )}
      </div>
    </TooltipWrapper>
  )
})

Text.displayName = "TextWidget"

export const TextWidget = Text
