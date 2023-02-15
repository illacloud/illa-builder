import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
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

export const dynamicInputStyle = css`
  padding: 8px 0;
  width: 100%;
`

const singleRowStyle = css`
  width: 100%;
  ${publicPaddingStyle}
`

const doubleRowStyle = css`
  min-height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${publicPaddingStyle}
`

export const applyLabelWrapperStyle = (
  isCustom: boolean = false,
): SerializedStyles => {
  return isCustom ? doubleRowStyle : singleRowStyle
}

export const dynamicWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const customAndInputWrapperStyle = css`
  display: flex;
  align-items: center;
  min-height: 28px;
`
