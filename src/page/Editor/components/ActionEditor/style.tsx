import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

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

export function applyIllaColor(color: IllaColor, size: string): string {
  return globalColor(`--${illaPrefix}-${color}-${size}`)
}

export function applyGridColIndex(index: number): SerializedStyles {
  return css`
    grid-column-start: ${index};
  `
}
