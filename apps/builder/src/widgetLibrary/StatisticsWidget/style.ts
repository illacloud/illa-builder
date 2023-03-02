import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

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
    gap: 8px;
    flex-direction: column;
    align-items: center;
    ${alignItemsStyle};
  `
}
export const getSecondaryStatisticStyle = (color?: string) => {
  return css`
    max-width: 100%;
    overflow: hidden;
    & > div:last-child > div,
    & > div:last-child > div > span {
      color: ${getColor(color || "", "03")};
      max-width: 100%;
    }
    & span {
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
    }
  `
}

export const getStatisticStyle = (color?: string) => {
  return css`
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    & > div:last-child > div,
    & > div:last-child > div > span {
      color: ${getColor(color || "", "03")};
      max-width: 100%;
    }
  `
}

export const getPrefixIconStyle = (color?: string, secondary?: boolean) => {
  const size = secondary ? 12 : 24
  return css`
    color: ${getColor(color || "", "03")};
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
    background: ${getColor(color || "", "07")};
    & span {
      line-height: 18px;
      font-size: 12px;
      margin-right: 2px;
      margin-left: 0;
    }
    & > div > div > div {
      display: flex;
      align-items: center;
    }
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
    margin-bottom: 4px;
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
    ${overflowStyle};
    font-size: 12px;
  `
}
