import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const fullStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getColor("gray", "01")};
  color: ${getColor("white", "01")};
`

export const applyHiddenStyle = (hidden: boolean): SerializedStyles => {
  return css`
    visibility: ${hidden ? "hidden" : "visible"};
  `
}
