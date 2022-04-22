import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const EditorContainer = css`
  display: flex;
  flex-direction: row;

  body {
    margin: 0;
  }
`
export const EditorRightArea = css`
  width: calc(100vw - 279px);
`
export const EditorBody = css`
  display: flex;
  flex-direction: row;
  height: 100%;
`

export const LeftPanelStyle = css`
  width: 279px;
`

export function applyFixedPosition(): SerializedStyles {
  return css`
    position: fixed;
  `
}
