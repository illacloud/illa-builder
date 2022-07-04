import { css } from "@emotion/react"

const getFlexDirection = (labelPosition: "left" | "right" | "top" = "left") => {
  switch (labelPosition) {
    case "left":
      return css`
        flex-direction: row;
      `
    case "right":
      return css`
        flex-direction: row-reverse;
      `
    case "top":
      return css`
        flex-direction: column;
      `
  }
}

export const applyBasicWrapperStyle = (
  hidden?: boolean,
  labelPosition?: "left" | "right" | "top",
) => {
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
    ${getFlexDirection(labelPosition)}
    justify-content: center;
    align-items: center;
  `
}
