import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"

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
        color: ${globalColor(`--${illaPrefix}-purple-01`)};
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
      color: ${globalColor(`--${illaPrefix}-purple-01`)};
    }
  `
}

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

export const dynamicSwitchInputStyle = css`
  padding: 8px 0;
  width: 100%;
`
