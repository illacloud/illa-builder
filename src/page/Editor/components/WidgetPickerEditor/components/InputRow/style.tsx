import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const singleWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
`
export const doubleWrapperCss = css`
`

export const fxSvgWrapper = css`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const labelNameCss = css`
  text-decoration: underline dotted
    ${globalColor(`--${illaPrefix}-grayblue-07`)};
`

export const labelWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`

export const inputWrapper = css`
  display: flex;
  align-items: center;
`

export const svgColorCss = css`
  fill: ${globalColor(`--${illaPrefix}-purple-01`)};
`

export const applyFxSvgColor = (isCustom?: boolean) => {
  return css`
    fill: ${isCustom
      ? globalColor(`--${illaPrefix}-purple-01`)
      : globalColor(`--${illaPrefix}-grayblue-06`)};
    cursor: pointer;
  `
}
