import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const actionEditorDragBarStyle = css`
  top: -5px;
  cursor: row-resize;
  width: 100%;
  position: absolute;
  transition: all 0.2s;
  height: 5px;
  z-index: 10;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`
