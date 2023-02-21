import { SerializedStyles, css } from "@emotion/react"

export const fullStyle = css`
  width: 100%;
  height: 100%;
`

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const applyHiddenStyle = (hidden: boolean): SerializedStyles => {
  return css`
    visibility: ${hidden ? "hidden" : "visible"};
  `
}
