import { css, SerializedStyles } from "@emotion/react"

export const applyBaseRadioGroupStyle = (
  isFullWidth: boolean = false,
): SerializedStyles => {
  return isFullWidth
    ? css`
        width: 100%;
        margin-top: 8px;
      `
    : css`
        min-width: 184px;
        display: flex;
        justify-content: end;
      `
}
