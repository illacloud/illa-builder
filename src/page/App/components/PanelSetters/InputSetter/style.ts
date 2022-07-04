import { css, SerializedStyles } from "@emotion/react"
import { fixedWidthStyle } from "@/page/App/components/PanelSetters/style"

export const applyInputSetterWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
}

export const applyInputSetterStyle = css`
  width: 100%;
`
