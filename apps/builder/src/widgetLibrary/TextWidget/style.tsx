import { SerializedStyles, css } from "@emotion/react"
import {
  HorizontalAlign,
  VerticalAlign,
} from "@/widgetLibrary/TextWidget/interface"

export function applyFullWidthAndFullHeightStyle(
  verticalAlign: VerticalAlign,
): SerializedStyles {
  return css`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: ${verticalAlign};
  `
}

export function applyMarkdownStyle(horizontalAlign?: string): SerializedStyles {
  return css`
    width: 100%;
    text-align: ${horizontalAlign};
    overflow-wrap: break-word;
  `
}
