import { SerializedStyles, css } from "@emotion/react"
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

export const editableInputSetterStyle = css`
  width: 154px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
`

export const editableInputIconStyle = css`
  width: 24px;
  height: 24px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
`
