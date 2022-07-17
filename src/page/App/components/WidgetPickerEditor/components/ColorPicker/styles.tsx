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
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

export const slideAndLumpContainerCss = css`
  display: inline-flex;
  width: 100%;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 21px;
  border-bottom: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const titleCss = css`
  width: 100%;
  font-size: 12px;
  height: 42px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  box-sizing: border-box;
  padding: 0 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-01`)};
  margin-bottom: 8px;
`

export const sessionTitleCss = css`
  width: 100%;
  color: ${globalColor(`--${illaPrefix}-grayBlue-01`)};
  font-size: 12px;
  padding: 10px 0 0 8px;
  box-sizing: border-box;
`

export const slideCss = css`
  margin-top: 9.6px;
  box-sizing: border-box;
  border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-07`)}; ;
`

export const commonSlidePointCss = css`
  width: 10px;
  height: 10px;
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
    left: ${percent ? toPoint(percent) * 180 : 0}px;
  `
}

export function applyAlphaPointCss(percent?: string) {
  return css`
    ${commonSlidePointCss};
    bottom: -2px;
    left: ${percent ? toPoint(percent) * 180 : 0}px;
  `
}

export function applyColorLumpCss(colorStr: RgbaColor) {
  return css`
    width: 24px;
    height: 24px;
    border-radius: 12px;
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
  margin-bottom: 4px;
  display: inline-flex;
  padding: 0 3px;
  margin-top: 8px;
  flex-wrap: wrap;
  box-sizing: border-box;
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

export const colorSwatchItemContainer = css`
  width: 34px;
  height: 22px;
  padding: 0 6px;
  margin-bottom: 6px;
  box-sizing: border-box;
`

export function applyColorCheckedItemContainer(isChecked?: boolean) {
  const borderCss = isChecked
    ? css`
        border: solid ${globalColor(`--${illaPrefix}-grayBlue-02`)} 1px;
      `
    : css`
        border: solid white 1px;
      `
  return css`
    width: 100%;
    height: 100%;
    padding: 1px;
    border-radius: 4px;
    box-sizing: border-box;
    ${borderCss}
  `
}

export function applyColorSwatchCss(colorStr?: string) {
  return css`
    border: solid 1px ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    height: 100%;
    width: 100%;
    background-color: ${colorStr};
    border-radius: 2px;
    box-sizing: border-box;
  `
}
