import { SerializedStyles, css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"
import { VerticalAlign } from "@/widgetLibrary/TextWidget/interface"

export function applyAlignStyle(
  verticalAlign?: VerticalAlign,
): SerializedStyles {
  return css`
    width: 100%;
    display: flex;
    align-items: ${verticalAlign};
  `
}

const getRealHeightStyle = (
  dynamicHeight: "auto" | "fixed" | "limited",
  dynamicMinHeight: number = 0,
  dynamicMaxHeight: number = 0,
) => {
  switch (dynamicHeight) {
    case "auto":
      return css`
        height: auto;
      `
    case "limited":
      return css`
        min-height: ${dynamicMinHeight - 6}px;
        height: auto;
        max-height: ${dynamicMaxHeight - 6}px;
      `
    case "fixed":
      return css`
        height: 100%;
      `
    default:
      return ""
  }
}

export const applyAutoHeightContainerStyle = (
  dynamicHeight: "auto" | "fixed" | "limited",
  dynamicMinHeight?: number,
  dynamicMAxHeight?: number,
) => {
  return css`
    display: flex;
    width: 100%;
    position: relative;
    ${getRealHeightStyle(dynamicHeight, dynamicMinHeight, dynamicMAxHeight)};
  `
}

export function applyMarkdownStyle(horizontalAlign?: string): SerializedStyles {
  return css`
    width: 100%;
    text-align: ${horizontalAlign};
    overflow-wrap: break-word;
  `
}

export const applyTextStyle = (horizontalAlign?: string, weight?: number) => {
  return css`
    width: 100%;
    font-weight: ${weight ?? 400};
    text-align: ${horizontalAlign};
    overflow-wrap: break-word;
  `
}

export const applyContainerStyle = (colorScheme: string) => {
  return css`
    width: 100%;
    color: ${getSpecialThemeColor(colorScheme)};

    a,
    span {
      color: ${getSpecialThemeColor(colorScheme)};
    }
  `
}
