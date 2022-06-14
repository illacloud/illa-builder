import { css, SerializedStyles } from "@emotion/react"
import { illaPrefix, globalColor } from "@illa-design/theme"
import { publicPaddingCss } from "@/page/App/components/InspectPanel/style"

export const dynamicSwitchWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const customAndSwitchWrapperCss = css`
  display: flex;
  align-items: center;
`

export const applyCustomIconStyle = (
  isSelected: boolean = false,
): SerializedStyles => {
  const color = isSelected
    ? globalColor(`--${illaPrefix}-purple-01`)
    : globalColor(`--${illaPrefix}-grayBlue-06`)
  return css`
    margin-right: 10px;
    color: ${color};
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      color: ${globalColor(`--${illaPrefix}-purple-01`)};
    }
  `
}

const singleRowCss = css`
  min-height: 48px;
  width: 100%;
  ${publicPaddingCss}
`

const doubleRowCss = css`
  min-height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  ${publicPaddingCss}
`

export const applyLabelWrapperStyle = (
  isCustom: boolean = false,
): SerializedStyles => {
  return isCustom ? singleRowCss : doubleRowCss
}
