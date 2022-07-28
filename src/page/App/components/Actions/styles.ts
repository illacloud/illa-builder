import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyActionEditorStyle(h: number) {
  return css`
    position: relative;
    width: 100%;
    height: ${h}px;
  `
}

export const actionEditorDragBarStyle = css`
  top: -5px;
  cursor: row-resize;
  width: 100%;
  position: absolute;
  transition: all 0.2s;
  height: 5px;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const contentContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
`
