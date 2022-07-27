import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
export const labelAndComponentWrapperStyle = css`
  width: 100%;
  display: flex;
`
export const applyValidateMessageWrapperStyle = (
  labelWidth: number,
): SerializedStyles => {
  return css`
    width: 100%;
    padding-left: calc(min(${labelWidth}%, 80%) + 8px);
  `
}
