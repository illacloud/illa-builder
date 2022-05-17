import { FC } from "react"
import MarkdownView, { ShowdownExtension } from "react-showdown"
import { TextProps } from "./interface"
import { applyTextCss, textContainerCss } from "./style"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"

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

export const textPanelConfig: PanelConfig[] = [
  {
    id: "text-basic",
    groupName: "Basic",
    children: [
      {
        id: "text-value",
        labelName: "Value",
        type: "TEXT_VALUE_SETTER",
        labelDesc:
          "Supports GitHub flavored markdown along with most HTML tags and presentational attributes.\n" +
          "\n" +
          "For full HTML, use the Custom or iFrame components.",
      },
    ],
  },
  {
    id: "text-adornments",
    groupName: "Adornments",
    children: [
      {
        id: "text-tooltip",
        labelName: "Tooltip",
        type: "INPUT_SETTER",
        attrName: "tooltipText",
        labelDesc:
          "Show a tooltip on the component or its label, when present.",
      },
    ],
  },
  {
    id: "text-layout",
    groupName: "Layout",
    children: [
      {
        id: "text-alignment",
        labelName: "Alignment",
        type: "ALIGNMENT_SETTER",
      },
      {
        id: "text-hidden",
        labelName: "Hidden",
        type: "INPUT_SETTER",
        attrName: "tooltipText",
      },
    ],
  },
  {
    id: "text-style",
    groupName: "Style",
    children: [
      {
        id: "text-color",
        type: "LIST_SETTER",
        labelName: "Color",
        childrenSetter: [
          {
            id: "text-backgroundColor",
            labelName: "Background",
            type: "INPUT_SETTER",
            attrName: "backgroundColor",
          },
          {
            id: "text-textColor",
            labelName: "text",
            type: "INPUT_SETTER",
            attrName: "textColor",
          },
          {
            id: "text-linksColor",
            labelName: "Links",
            type: "INPUT_SETTER",
            attrName: "linkColor",
          },
        ],
      },
    ],
  },
]
