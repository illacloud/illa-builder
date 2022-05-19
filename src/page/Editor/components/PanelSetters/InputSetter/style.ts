import { css, SerializedStyles } from "@emotion/react"

export const applyBaseInputWrapperStyle = (
  isFullWidth: boolean = false,
): SerializedStyles => {
  return isFullWidth
    ? css`
        width: 100%;
        margin-top: 8px;
      `
    : css`
        width: 184px;
      `
}

export const applyInputSetterWrapperStyle = (
  isFullWidth: boolean = false,
  isInList: boolean = false,
): SerializedStyles => {
  return isInList
    ? css`
        width: 100%;
      `
    : applyBaseInputWrapperStyle(isFullWidth)
}
