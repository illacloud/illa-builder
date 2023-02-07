import { SerializedStyles, css } from "@emotion/react"
import {
  HorizontalAlign,
  VerticalAlign,
} from "@/widgetLibrary/TextWidget/interface"

export function applyAlignStyle(
  horizontalAlign?: HorizontalAlign,
  verticalAlign?: VerticalAlign,
): SerializedStyles {
  return css`
    width: 100%;
    display: flex;
    justify-content: ${horizontalAlign};
    align-items: ${verticalAlign};
  `
}

export const fullWidthAndFullHeightStyle = css`
  width: 100%;
`

export const markdownStyle = css`
  width: 100%;
  overflow-wrap: break-word;
`
