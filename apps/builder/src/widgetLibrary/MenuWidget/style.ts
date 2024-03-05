import { SerializedStyles, css } from "@emotion/react"
import { MenuMode, getColor } from "@illa-design/react"

export function applyMenuBrandContainerStyle(mode: MenuMode): SerializedStyles {
  return css`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    padding: ${mode === "horizontal" ? "0px" : "16px"} 16px;
    padding-bottom: ${mode === "horizontal" ? "0px" : "8px"};
    margin-right: ${mode === "horizontal" ? "16px" : "0px"};
  `
}

export function applyMenuTitleStyle(mode: MenuMode): SerializedStyles {
  return css`
    margin-left: ${mode === "horizontal" ? "8px" : "12px"};
    color: ${getColor("grayBlue", "02")};
    font-size: 14px;
    font-style: normal;
    white-space: nowrap;
    font-weight: 500;
  `
}

export function applyMenuWidgetContainerStyle(
  mode: MenuMode,
): SerializedStyles {
  return css`
    display: flex;
    flex-direction: ${mode === "horizontal" ? "row" : "column"};
    align-items: ${mode === "horizontal" ? "center" : "flex-start"};
  `
}
