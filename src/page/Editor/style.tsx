import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const EditorContainer = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  body {
    margin: 0;
  }
`
export const EditorRightArea = css`
  width: 100%;
`
export const EditorBody = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100% - 48px);
`

export const LeftPanelStyle = css`
  width: 280px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const RightPanelStyle = css`
  width: 320px;
  height: 100%;
  flex-shrink: 0;
  border-left: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const EditorCenterStyle = css`
  width: 100%;
  position: relative;
  overflow: auto;
`

export function applyFixedPosition(): SerializedStyles {
  return css`
    position: fixed;
  `
}
