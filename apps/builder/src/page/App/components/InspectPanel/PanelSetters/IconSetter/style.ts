import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { fixedWidthStyle } from "@/page/App/components/InspectPanel/PanelSetters/style"

export const applyBaseIconWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  const width = isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
  return css`
    ${width};
    height: 100%;
  `
}

export const iconSelectorIconStyle = css`
  width: 24px;
  height: 24px;
  padding: 4px;
  & > svg {
    width: 16px;
    height: 16px;
  }
`

export const iconSelectorContainerStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding: 3px 12px;
  border-radius: 8px;
  cursor: pointer;
  gap: 8px;
  display: flex;
  overflow: hidden;
  align-items: center;
  :hover > div:last-child {
    display: flex;
  }
`

export const iconContentStyle = css`
  height: 100%;
  display: flex;
  font-size: 12px;
  line-height: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const clearIconStyle = css`
  width: 16px;
  height: 16px;
  display: none;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 8px;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 12px;
    height: 12px;
  }
`

export const iconPickerContainerStyle = css`
  min-width: 545px;
  height: 546px;
  display: flex;
  flex-direction: column;
`

export const iconPickerHeaderContainerStyle = css`
  width: 100%;
  height: 56px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const iconPickerHeaderTextStyle = css`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`

export const iconPickerSearchStyle = css`
  width: 100%;
  height: 48px;
  padding: 0 16px 16px 16px;
  box-shadow: inset 0px -1px 0px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const iconPickerBodyStyle = css`
  width: 100%;
  flex: 1;
  display: flex;
  overflow: scroll;
`

export const iconPickerLeftPanelStyle = css`
  flex: 1;
  max-height: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;
  border-bottom-left-radius: 8px;
  flex: none;
`

export const leftPanelItemStyle = css`
  width: 100%;
  min-height: 40px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  background: ${globalColor(`--${illaPrefix}-white-01`)};
`

export const rightPanelStyle = css`
  width: 440px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const rightTopPanelStyle = css`
  width: 100%;
  height: 40px;
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  padding: 8px 0 0;
  display: flex;
  align-items: center;
`

export const getSelectedStyle = (selected: boolean) => {
  if (selected) {
    return css`
      box-shadow: inset 0px -2px 0px ${globalColor(`--${illaPrefix}-grayBlue-02`)};
    `
  } else {
    return css``
  }
}

export const getNameSelectedStyle = (selected: boolean) => {
  if (selected) {
    return css`
      background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    `
  } else {
    return css``
  }
}

export const rightTopItemStyle = css`
  width: auto;
  height: 32px;
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`

export const rightBottomStyle = css`
  width: 100%;
  flex-grow: 1;
  min-width: 400px;
  overflow: scroll;
  padding: 0px 8px 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`

export const rightBottomItemStyle = css`
  width: 48px;
  cursor: pointer;
  height: 48px;
  display: inline-block;
  padding: 12px;
  & > svg {
    width: 24px;
    height: 24px;
  }
`

export const headerCloseIconStyle = css`
  cursor: pointer;
`

export const fallbackContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0px 8px 8px;
  justify-content: center;
  align-items: center;
`

export const setterContainerStyle = (isSetterSingleRow: boolean = false) => {
  const basicStyle = css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
  const singleRowStyle = css`
    flex-direction: column;
    gap: 8px;
  `
  return css`
    display: flex;
    padding: 8px 0;
    ${isSetterSingleRow ? singleRowStyle : basicStyle};
    width: 100%;
  `
}
