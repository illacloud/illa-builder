import { SerializedStyles, css } from "@emotion/react"

export function applyAlignStyle(): SerializedStyles {
  return css`
    width: 100%;
    display: flex;
  `
}

export const fullWidthAndFullHeightStyle = css`
  width: 100%;
`

export function applyMarkdownStyle(horizontalAlign?: string): SerializedStyles {
  return css`
    width: 100%;
    text-align: ${horizontalAlign};
    overflow-wrap: break-word;
  `
}
