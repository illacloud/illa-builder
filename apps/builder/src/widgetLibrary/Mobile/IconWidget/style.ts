import { css } from "@emotion/react"

export const getIconContainerStyle = (
  isWidthBigger: boolean,
  colorScheme?: string,
) => {
  const svgStyle = isWidthBigger
    ? css`
        height: 100%;
        width: auto;
      `
    : css`
        width: 100%;
        height: auto;
      `
  const svgColor = colorScheme
    ? css`
        color: ${colorScheme};
      `
    : css``
  return css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & div {
      ${svgStyle};
    }
    & svg {
      ${svgStyle};
      ${svgColor};
      cursor: pointer;
      display: block;
    }
  `
}
