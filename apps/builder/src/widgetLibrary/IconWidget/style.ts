import { css } from "@emotion/react"

export const getIconContainerStyle = (isWidthBigger: boolean) => {
  const svgStyle = isWidthBigger
    ? css`
        height: 100%;
        width: auto;
      `
    : css`
        width: 100%;
        height: auto;
      `
  return css`
    width: 100%;
    height: 100%;
    & svg {
      ${svgStyle};
      display: block;
    }
  `
}
