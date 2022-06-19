import { css, SerializedStyles } from "@emotion/react"
import { applyFixedWidthStyle } from "@/page/App/components/PanelSetters/style"

export const applyRadioGroupWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        width: 100%;
        margin-top: 8px;
      `
    : applyFixedWidthStyle
}
