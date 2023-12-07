import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const dynamicSwitchWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const customAndSwitchWrapperStyle = css`
  display: flex;
  align-items: center;
  min-height: 28px;
`

export const applyCustomIconStyle = (
  isSelected: boolean = false,
): SerializedStyles => {
  const selectedStyle = isSelected
    ? css`
        color: ${globalColor(`--${illaPrefix}-purple-03`)};
      `
    : css`
        color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
        margin-right: 10px;
      `
  return css`
    ${selectedStyle};
    width: 16px;
    height: 16px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      color: ${globalColor(`--${illaPrefix}-purple-03`)};
    }
  `
}

const singleRowStyle = css`
  width: 100%;
  padding: 8px 16px;
`

const doubleRowStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  gap: 8px;
`

export const applyLabelWrapperStyle = (
  isCustom: boolean = false,
): SerializedStyles => {
  return isCustom ? doubleRowStyle : singleRowStyle
}

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
