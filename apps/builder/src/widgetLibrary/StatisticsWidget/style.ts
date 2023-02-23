import { css } from "@emotion/react"

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
    width: 100%;
    //flex-wrap: wrap;
    gap: 8px;
    justify-content: ${justifyContent};
    align-items: center;
  `
}

export const getStatisticStyle = (color?: string, secondary?: boolean) => {
  const secondaryStyle = secondary
    ? css`
        & span {
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
        }
      `
    : css``

  return css`
    ${secondaryStyle};
    max-width: 100%;
    & > div:last-child > div,
    & > div:last-child > div > span {
      color: ${color};
      ${overflowStyle};
      max-width: 100%;
    }
  `
}

export const getPrefixContentStyle = (color?: string) => {
  return css`
    color: ${color};
    display: inline-block;
  `
}

export const getPrefixIconStyle = (color?: string) => {
  return css`
    color: ${color};
    display: flex;
    margin-right: 8px;
    height: 100%;
    align-items: center;
    & > svg {
      width: 24px;
      height: 24px;
    }
  `
}
