import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"

export const EditorContainer = css`
  display: flex;
  flex-direction: row;
`
export const EditorBody = css`
  display: flex;
  flex-direction: row;
`

export const LeftPanelStyle = css`
  width: 279px;
`

export function applyFixedPosition(): SerializedStyles {
  return css`
    position: fixed;
  `
}
