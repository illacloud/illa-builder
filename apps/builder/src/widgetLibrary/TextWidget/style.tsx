import { SerializedStyles, css } from "@emotion/react"
import {
  HorizontalAlign,
  VerticalAlign,
} from "@/widgetLibrary/TextWidget/interface"

export function applyAlignStyle(): SerializedStyles {
  return css`
    width: 100%;
    display: flex;
  `
}

export const fullWidthAndFullHeightStyle = css`
  width: 100%;
  height: 0;
`

export function applyMarkdownStyle(horizontalAlign?: string): SerializedStyles {
  return css`
    width: 100%;
    text-align: ${horizontalAlign};
    overflow-wrap: break-word;
  `
}
