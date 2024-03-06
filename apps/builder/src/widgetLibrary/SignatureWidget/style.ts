import { css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"
import { getPaddingShape } from "@/utils/styleUtils/padding"
import { applyLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"

export const containerStyle = (padding?: string, backgroundColor?: string) => {
  const paddings = getPaddingShape(padding)
  return css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: ${paddings.paddingTop}px ${paddings.paddingRight}px
      ${paddings.paddingBottom}px ${paddings.paddingLeft}px;
    background-color: ${backgroundColor};
  `
}

export const labelWrapperStyle = (
  labelPosition: "left" | "right" | "top" = "left",
) => {
  const layoutCss = applyLabelAndComponentWrapperStyle(labelPosition)
  return css`
    ${layoutCss};
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: ${labelPosition === "top" ? "column" : "row"};
    & label {
      flex: none;
    }
    position: relative;
  `
}

export const canvasContainerStyle = (disabled?: boolean) => css`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  pointer-events: ${disabled ? "none" : "auto"};
  cursor: ${disabled ? "not-allowed" : "auto"};
`

export const canvasStyle = css`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

export const signTextStyle = (color: string) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${getSpecialThemeColor(color)};
  font-size: 14px;
  font-weight: 500;
  transform: translate(-50%, -50%);
`

export const resetIconStyle = (color: string) => css`
  position: absolute;
  top: 12px;
  right: 12px;
  color: ${getSpecialThemeColor(color)};
  cursor: pointer;
`

export const lineStyle = (color: string) => css`
  position: absolute;
  bottom: 32px;
  width: 100%;
  height: 2px;
  background-color: ${getSpecialThemeColor(color)};
`

export const validateMessageStyle = (
  labelWidth: number,
  labelPosition: "left" | "right" | "top" = "left",
  labelHidden: boolean = false,
) => {
  return css`
    width: 100%;
    padding-left: ${labelPosition === "top" || labelHidden
      ? 0
      : `calc(${labelWidth}% + 8px)`};
    position: absolute;
    bottom: 0;
  `
}
