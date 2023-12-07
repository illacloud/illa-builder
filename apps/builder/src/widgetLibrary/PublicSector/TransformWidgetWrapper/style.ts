import { SerializedStyles, css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"
import { getShadowStyle } from "@/utils/styleUtils/shadow"

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

const getWrapperBackgroundColor = (
  widgetType?: string,
  backgroundColor?: string,
) => {
  if (
    widgetType === "CONTAINER_WIDGET" ||
    widgetType === "LIST_WIDGET" ||
    widgetType === "MODAL_WIDGET" ||
    widgetType === "FORM_WIDGET"
  ) {
    return backgroundColor
      ? getSpecialThemeColor(backgroundColor) || backgroundColor
      : "white"
  }
  return "transparent"
}

export const applyWrapperStylesStyle = (
  borderColor?: string,
  borderWidth?: string,
  radius?: string,
  backgroundColor?: string,
  shadowSize?: "none" | "small" | "medium" | "large",
  widgetType?: string,
) => {
  let borderStyle = "unset"
  if (borderColor && borderWidth) {
    borderStyle = `${borderWidth} solid ${
      borderColor
        ? getSpecialThemeColor(borderColor) || borderColor
        : "transparent"
    }`
  }
  const shadowStyle = getShadowStyle(shadowSize)
  return css`
    width: 100%;
    height: 100%;
    border: ${borderStyle};
    border-radius: ${radius};
    background-color: ${getWrapperBackgroundColor(widgetType, backgroundColor)};
    box-shadow: ${shadowStyle};
    overflow-x: hidden;
  `
}
