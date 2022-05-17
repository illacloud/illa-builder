import { css, SerializedStyles } from "@emotion/react"

export const applyRadioGroupSetterStyle = (
  isDouble?: boolean,
): SerializedStyles => {
  return isDouble
    ? css``
    : css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 48px;
      `
}

export const applyRadioGroupWrapperStyle = (
  isDouble?: boolean,
): SerializedStyles => {
  return isDouble
    ? css`
        margin-top: 8px;
      `
    : css`
        min-width: 184px;
        display: flex;
        justify-content: end;
      `
}
