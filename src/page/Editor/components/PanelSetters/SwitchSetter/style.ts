import { css } from "@emotion/react"
import { illaPrefix, globalColor } from "@illa-design/theme"

export const dynamicSwitchWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const customAndSwitchWrapperCss = css`
  display: flex;
  align-items: center;
`

export const applyCustomIconStyle = (isSelected: boolean = false) => {
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

export const labelCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`
