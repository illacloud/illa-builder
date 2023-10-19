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

export const applyWrapperSlider = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 8px;
  align-items: center;
`

export const applyIcon = css`
  height: 16px;
  width: 16px;
`
