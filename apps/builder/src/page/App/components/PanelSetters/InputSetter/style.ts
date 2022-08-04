import { css, SerializedStyles } from "@emotion/react"
import {
  fixedWidthStyle,
  listSetterWidthStyle,
} from "@/page/App/components/PanelSetters/style"
import { globalColor, illaPrefix } from "@illa-design/theme"

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

export const editableInputSetterStyle = css`
  max-width: 104px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  :hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`
