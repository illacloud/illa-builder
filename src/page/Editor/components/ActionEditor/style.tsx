import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

type Direction = "left" | "right" | "top" | "bottom"
type IllaColor =
  | "white"
  | "blackAlpha"
  | "gray"
  | "grayBlue"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "cyan"
  | "purple"
  | "techPink"
  | "techPurple"

export const ActionEditorContainer = css`
  display: flex;
  height: 100%;
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  min-height: 300px;
`

export const ActionEditorPanelLayoutWrapper = css`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 0 0 auto;
`

export const ActionEditorPanelWrapper = css``

export function applyContainerHeight(height: number): SerializedStyles {
  return css({
    height,
  })
}

export function applyResizerCSS(
  isResizing: boolean,
  bottom: number,
): SerializedStyles {
  const bgColor = css`
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  `
  return css`
    bottom: ${bottom}px;
    height: 5px;
    width: 100%;
    position: absolute;
    cursor: row-resize;
    transition: background-color 0.2s ease-in-out;
    ${isResizing && bgColor};
    &:hover {
      background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    }
  `
}

export function applyIllaColor(
  color: IllaColor,
  size: string,
): SerializedStyles {
  return css`
    color: ${globalColor(`--${illaPrefix}-${color}-${size}`)};
  `
}

export function applyMarginSingle(
  direction: Direction,
  number: number,
): SerializedStyles {
  return css`margin-${direction}:${number}px; `
}

export function applyMargin(...args: number[]) {
  switch (args.length) {
    case 1:
      return css`
        margin: ${args[0]}px;
      `
    case 2:
      return css`
        margin: ${args[0]}px ${args[1]}px;
      `
    case 3:
      return css`
        margin: ${args[0]}px ${args[1]}px ${args[2]}px;
      `
    case 4:
      return css`
        margin: ${args[0]}px ${args[1]}px ${args[2]}px ${args[3]}px;
      `
    default:
      return css`
        margin: ${args[0]}px;
      `
  }
}

export function applyPadding(...args: number[]) {
  switch (args.length) {
    case 1:
      return css`
        padding: ${args[0]}px;
      `
    case 2:
      return css`
        padding: ${args[0]}px ${args[1]}px;
      `
    case 3:
      return css`
        padding: ${args[0]}px ${args[1]}px ${args[2]}px;
      `
    case 4:
      return css`
        padding: ${args[0]}px ${args[1]}px ${args[2]}px ${args[3]}px;
      `
    default:
      return css`
        padding: ${args[0]}px;
      `
  }
}
export function applyPaddingSingle(
  direction: Direction,
  number: number,
): SerializedStyles {
  return css`padding-${direction}:${number}px; `
}

export function applyGridColIndex(index: number): SerializedStyles {
  return css`
    grid-column-start: ${index};
  `
}

export function applyJustifyContent(align: string): SerializedStyles {
  return css`
    justify-content: ${align};
  `
}
