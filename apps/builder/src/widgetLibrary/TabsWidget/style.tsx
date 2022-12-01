import { SerializedStyles, css } from "@emotion/react"
import { HorizontalAlign } from "@/widgetLibrary/TextWidget/interface"

export function applyAlignStyle(
  horizontalAlign?: HorizontalAlign,
): SerializedStyles {
  return css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: ${horizontalAlign};
  `
}

export const fullWidthAndFullHeightStyle = css`
  width: 100%;
  height: 100%;
`
