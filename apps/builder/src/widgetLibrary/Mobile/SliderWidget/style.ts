import { SerializedStyles, css } from "@emotion/react"

export const applyLabelAndComponentWrapperStyle = (
  labelPosition: "left" | "right" | "top" = "left",
): SerializedStyles => {
  if (labelPosition === "left") {
    return css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `
  }
  if (labelPosition === "right") {
    return css`
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
    `
  }
  return css``
}

export const sliderContainerStyle = css`
  width: 100%;
`
