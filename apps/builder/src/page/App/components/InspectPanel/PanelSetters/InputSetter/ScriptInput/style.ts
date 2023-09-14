import { css } from "@emotion/react"
import { fixedWidthStyle } from "../../style"

export const applyInputSetterWrapperStyle = (
  isSetterSingleRow: boolean = false,
) => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
}
