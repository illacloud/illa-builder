import { SerializedStyles, css } from "@emotion/react"

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

const getShadowStyle = (shadow?: "none" | "small" | "medium" | "large") => {
  switch (shadow) {
    case "small": {
      return "0px 2px 8px rgba(0, 0, 0, 0.08);"
    }
    case "medium": {
      return "0px 4px 16px rgba(0, 0, 0, 0.08);"
    }
    case "large": {
      return "0px 8px 20px rgba(0, 0, 0, 0.12);"
    }
    case "none":
    default:
      return "unset"
  }
}

export const applyWrapperStylesStyle = (
  borderColor?: string,
  borderWidth?: string,
  radius?: string,
  backgroundColor?: string,
  shadow?: "none" | "small" | "medium" | "large",
  widgetType?: string,
) => {
  let borderStyle = "unset"
  if (borderColor && borderWidth) {
    borderStyle = `${borderWidth} solid ${borderColor}`
  }
  const shadowStyle = getShadowStyle(shadow)
  return css`
    width: 100%;
    height: 100%;
    border: ${borderStyle};
    border-radius: ${radius};
    background-color: ${widgetType === "CONTAINER_WIDGET" ||
    widgetType === "LIST_WIDGET" ||
    widgetType === "MODAL_WIDGET"
      ? backgroundColor || "white"
      : "transparent"};
    box-shadow: ${shadowStyle};
    overflow-x: hidden;
  `
}
