import { SerializedStyles, css } from "@emotion/react"
import { VerticalAlign } from "@/widgetLibrary/TextWidget/interface"
import { UNIT_HEIGHT } from "../../page/App/components/DotPanel/renderComponentCanvas"

export function applyAlignStyle(
  verticalAlign?: VerticalAlign,
): SerializedStyles {
  return css`
    width: 100%;
    display: flex;
    align-items: ${verticalAlign};
  `
}

const getRealHeight = (
  dynamicHeight: "auto" | "fixed" | "limited",
  realHeight: number,
  dynamicMinHeight: number = 0,
  dynamicMaxHeight: number = 0,
) => {
  switch (dynamicHeight) {
    case "auto":
      return "auto"
    case "limited":
      if (realHeight < (dynamicMinHeight ?? UNIT_HEIGHT * 3 - 6)) {
        return `${dynamicMinHeight ?? UNIT_HEIGHT * 3 - 6}px`
      }
      if (realHeight >= dynamicMinHeight && realHeight <= dynamicMaxHeight) {
        return `${realHeight}px`
      }
      if (realHeight > dynamicMaxHeight) {
        return "auto"
      }
    case "fixed":
      return `${dynamicMinHeight}px`
    default:
      return ""
  }
}

export const applyAutoHeightContainerStyle = (
  dynamicHeight: "auto" | "fixed" | "limited",
  realHeight?: number,
  dynamicMinHeight?: number,
  dynamicMAxHeight?: number,
) => {
  return css`
    display: flex;
    width: 100%;
    height: ${getRealHeight(
      dynamicHeight,
      realHeight ?? 0,
      dynamicMinHeight,
      dynamicMAxHeight,
    )};
  `
}

export function applyMarkdownStyle(horizontalAlign?: string): SerializedStyles {
  return css`
    width: 100%;
    text-align: ${horizontalAlign};
    overflow-wrap: break-word;
  `
}
