import { css } from "@emotion/react"
import {
  getColor,
  getSpecialThemeColor,
  globalColor,
  illaPrefix,
} from "@illa-design/react"

const overflowStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const getAlignItems = (textAlign?: string) => {
  let alignItemsStyle = css``
  if (!textAlign || textAlign === "start") {
    alignItemsStyle = css`
      align-items: flex-start;
    `
  }
  if (textAlign === "center") {
    alignItemsStyle = css`
      align-items: center;
    `
  }
  if (textAlign === "end") {
    alignItemsStyle = css`
      align-items: flex-end;
    `
  }
  return alignItemsStyle
}

export const getStatisticWrapperStyle = (textAlign?: string) => {
  const alignItemsStyle = getAlignItems(textAlign)
  return css`
    display: flex;
    gap: 4px;
    flex-direction: column;
    align-items: center;
    ${alignItemsStyle};
  `
}
export const getSecondaryStatisticStyle = css`
  max-width: 100%;
  overflow: hidden;
  & span {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
`

export const getStatisticStyle = css`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  line-height: 36px;
`

export const getPrefixIconStyle = (color?: string, secondary?: boolean) => {
  const size = secondary ? 12 : 24
  return css`
    color: ${getSpecialThemeColor(color || "")};
    display: inline-flex;
    height: 100%;
    align-items: center;
    & > svg {
      width: ${size}px;
      height: ${size}px;
    }
  `
}

export const primaryStatisticContainerStyle = css`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: center;
`

export const getStatisticsContainerStyle = (textAlign?: string) => {
  let justifyContentStyle = css``
  if (textAlign === "end") {
    justifyContentStyle = css`
      justify-content: flex-end;
    `
  }
  if (textAlign === "center") {
    justifyContentStyle = css`
      justify-content: center;
    `
  }

  return css`
    ${justifyContentStyle};
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: center;
    gap: 8px;
  `
}

export const getSecondaryStatisticContainerStyle = (color?: string) => {
  return css`
    display: flex;
    gap: 2px;
    align-items: center;
    height: 18px;
    padding: 0 4px;
    border-radius: 2px;
    background: ${getColor(color || "", "08")};
  `
}

export const getStatisticLabelStyle = (textAlign?: string) => {
  let textAlignStyle = css``
  if (textAlign === "end") {
    textAlignStyle = css`
      text-align: right;
    `
  }
  if (textAlign === "center") {
    textAlignStyle = css`
      text-align: center;
    `
  }

  return css`
    ${textAlignStyle};
    max-width: 100%;
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
    ${overflowStyle};
    font-size: 12px;
    line-height: 16px;
  `
}
