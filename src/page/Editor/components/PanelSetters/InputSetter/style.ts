import { css, SerializedStyles } from "@emotion/react"
import { applySetterStyle } from "../style"

export const applyInputSetterWrapperStyle = (
  isFullWidth: boolean = false,
  isInList: boolean = false,
): SerializedStyles => {
  return isInList
    ? css`
        width: 100%;
      `
    : applySetterStyle(isFullWidth)
}
