import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const applyEditorContainer = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
export const applyEditorRightArea = css`
  width: 100%;
`
export const applyEditorBody = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100% - 48px);
`

export const applyLeftPanelStyle = css`
  width: 280px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const applyRightPanelStyle = css`
  width: 320px;
  height: 100%;
  flex-shrink: 0;
  border-left: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const applyEditorCenterStyle = css`
  width: 100%;
`

export function applyFixedPosition(): SerializedStyles {
  return css`
    position: fixed;
  `
}
