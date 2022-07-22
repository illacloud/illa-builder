import { css } from "@emotion/react"
import { RgbaColor } from "@uiw/color-convert/src"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const saturationCss = css`
  width: 244px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const slideContainerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

export const slideAndLumpContainerCss = css`
  display: flex;
  width: 100%;
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding: 0 16px;
`

export const titleCss = css`
  width: 100%;
  font-size: 12px;
  height: 42px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-01`)};
`

export const sessionTitleCss = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  font-size: 12px;
  box-sizing: border-box;
`

export const slideCss = css`
  margin-top: 9.6px;
  box-sizing: border-box;
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-07`)}; ;
`

export const commonSlidePointCss = css`
  width: 12px;
  height: 12px;
  border-radius: 5px;
  position: absolute;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  box-sizing: border-box;
  box-shadow: ${globalColor(`--${illaPrefix}-blackAlpha-03`)} 0 0 2px;
`

function toPoint(percent: string) {
  return Number(percent.replace("%", "")) / 100
}

export function applyHuePointCss(percent?: string) {
  return css`
    ${commonSlidePointCss};
    bottom: -0.5px;
    left: ${percent ? toPoint(percent) * 150 : 0}px;
  `
}

export function applyAlphaPointCss(percent?: string) {
  return css`
    ${commonSlidePointCss};
    bottom: -0.5px;
    left: ${percent ? toPoint(percent) * 150 : 0}px;
  `
}

export function applyColorLumpRadioStyle(colorStr: RgbaColor) {
  console.log("colorStr", colorStr)
  return css`
    ${applyColorLumpCss(colorStr)};
    border-radius: 50%;
    width: 24px;
    height: 24px;
  `
}

export function applyColorLumpCss(colorStr: RgbaColor) {
  return css`
    width: 32px;
    height: 32px;
    border-radius: 4px;
    flex: none;
    &:hover {
      cursor: pointer;
    }
    margin-left: 8px;
    border: solid ${globalColor(`--${illaPrefix}-gray-06`)} 0.6px;
    background-color: rgba(
      ${colorStr.r},
      ${colorStr.g},
      ${colorStr.b},
      ${colorStr.a}
    );
  `
}

export const colorInputContainerCss = css`
  border-radius: 4px;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
`

export const labelCss = css`
  margin-right: 5px;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const swatchContainerCss = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-top: 5px;
`

export const colorInputCss = css`
  display: inline-flex;
  border-radius: 8px;
  font-size: 12px;
  width: 100%;
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const triggerCss = css`
  width: fit-content;
  margin-right: 4px;
`

export const percentInputCss = css`
  border: 0;
  height: 100%;
  width: 34px;
  font-size: 12px;
  margin-left: 8px;
  margin-right: 8px;
  box-sizing: border-box;
  background-color: transparent;
`

export const colorSwatchItemContainer = css``

export function applyColorCheckedItemContainer(isChecked?: boolean) {
  return css`
    padding: 3px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid
      ${isChecked ? globalColor(`--${illaPrefix}-grayBlue-07`) : "transparent"};
  `
}

export function applyColorSwatchCss(colorStr?: string) {
  return css`
    border: 1px solid
      ${colorStr === "#fff"
        ? `${globalColor(`--${illaPrefix}-grayBlue-08`)}`
        : "transparent"};
    height: 16px;
    width: 16px;
    background-color: ${colorStr};
    border-radius: 2px;
    box-sizing: border-box;
  `
}

export const swatchWrapperStyle = css`
  width: 100%;
  padding: 8px 12px;
`

export const titleStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-size: 12px;
  font-weight: 500;
`

export const closeIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-size: 14px;
  cursor: pointer;
`
