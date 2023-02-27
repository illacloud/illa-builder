import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

const overflowStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const getStatisticContainerStyle = (textAlign?: string) => {
  let justifyContent
  if (!textAlign || textAlign === "start") {
    justifyContent = "flex-start"
  }
  if (textAlign === "center") {
    justifyContent = "center"
  }
  if (textAlign === "end") {
    justifyContent = "flex-end"
  }
  return css`
    display: flex;
    gap: 8px;
    justify-content: ${justifyContent};
    align-items: center;
    max-width: 100%;
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
    display: flex;
    height: 100%;
    align-items: center;
    & > svg {
      width: ${size}px;
      height: ${size}px;
    }
  `
}

export const statisticContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
  gap: 8px;
`

export const contentContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`

export const getSecondaryStatisticContainerStyle = (color?: string) => {
  return css`
    display: flex;
    gap: 4px;
    align-items: center;
    height: 18px;
    padding: 0 4px 0 2px;
    border-radius: 4px;
    background: ${getColor(color || "", "07")};
    & span {
      line-height: 18px;
      font-size: 12px;
    }
    & > div > div > div {
      display: flex;
      align-items: center;
    }
  `
}

export const statisticTitleStyle = css`
  margin-bottom: 4px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  ${overflowStyle};
  font-size: 12px;
`
