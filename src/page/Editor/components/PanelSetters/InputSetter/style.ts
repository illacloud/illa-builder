import { css, SerializedStyles } from "@emotion/react"

export const applyInputSetterStyle = (isDouble?: boolean): SerializedStyles => {
  return isDouble
    ? css``
    : css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 48px;
      `
}

export const applyInputWrapperStyle = (
  isDouble?: boolean,
): SerializedStyles => {
  return isDouble
    ? css`
        margin-top: 8px;
      `
    : css`
        width: 184px;
      `
}
