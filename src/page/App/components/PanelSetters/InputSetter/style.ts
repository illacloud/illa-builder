import { css, SerializedStyles } from "@emotion/react"
import {
  fixedWidthStyle,
  listSetterWidthStyle,
} from "@/page/App/components/PanelSetters/style"

export const applyInputSetterWrapperStyle = (
  isSetterSingleRow: boolean = false,
  isInList: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : isInList
    ? listSetterWidthStyle
    : fixedWidthStyle
}

export const applyInputSetterStyle = css`
  width: 100%;
`
