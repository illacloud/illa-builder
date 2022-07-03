import { css } from "@emotion/react"

export const applyBasicWrapperStyle = (hidden?: boolean) => {
  const shapeStyle = hidden
    ? css`
        width: 0;
        height: 0;
      `
    : css`
        width: 100%;
        height: 100%;
      `
  return css`
    ${shapeStyle};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `
}
