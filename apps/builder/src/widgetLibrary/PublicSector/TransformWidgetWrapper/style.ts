import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"

export const applyValidateMessageWrapperStyle = (
  labelWidth: number,
  labelPosition: "left" | "right" | "top" = "left",
  labelHidden: boolean = false,
): SerializedStyles => {
  return css`
    width: 100%;
    padding-left: ${labelPosition === "top" || labelHidden
      ? 0
      : `calc(${labelWidth}% + 8px)`};
  `
}

export const applyLabelAndComponentWrapperStyle = (
  labelPosition: "left" | "right" | "top" = "left",
) => {
  if (labelPosition === "top") {
    return css``
  }
  if (labelPosition === "left") {
    return css`
      display: flex;
    `
  }
  if (labelPosition === "right") {
    return css`
      display: flex;
      flex-direction: row-reverse;
    `
  }
}

export const applyCenterLabelAndComponentWrapperStyle = (
  labelPosition: "left" | "right" | "top" = "left",
) => {
  const layoutCss = applyLabelAndComponentWrapperStyle(labelPosition)
  return css`
    ${layoutCss};
    width: 100%;
    height: 100%;
    align-items: center;
  `
}

export const applyHiddenWrapperStyle = (hidden: boolean) => {
  return css`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    visibility: ${hidden ? "hidden" : "visible"};
  `
}
