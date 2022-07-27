import { css, SerializedStyles } from "@emotion/react"

export const getFlexDirection = (
  labelPosition: "left" | "right" | "top" = "left",
): SerializedStyles => {
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

export const applyBasicWrapperStyle = (hidden?: boolean): SerializedStyles => {
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: text;
  `
}
