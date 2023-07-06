import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  WIDGET_PADDING,
  WIDGET_SCALE_SQUARE_BORDER_WIDTH,
} from "@/page/App/components/ScaleSquare/constant/widget"

export const hoverHotSpotStyle = css`
  width: 100%;
  height: 100%;
`

const getWrapperBorderColor = (
  isLikProductionMode: boolean,
  isSelected: boolean,
  hasEditors: boolean,
  isHover: boolean,
  canShowDot: boolean,
) => {
  if (isLikProductionMode) {
    return "transparent"
  }
  if (isSelected || hasEditors || isHover || canShowDot) {
    return getColor("techPurple", "01")
  }
  return "transparent"
}

const getWrapperBorderStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  isHover: boolean,
  canShowDot: boolean,
) => {
  if (isSelected || isHover) {
    return "solid"
  }

  if (hasEditors || canShowDot) {
    return "dashed"
  }

  return "solid"
}

const getWrapperBorder = (
  isLikProductionMode: boolean,
  isSelected: boolean,
  hasEditors: boolean,
  isHover: boolean,
  canShowDot: boolean,
) => {
  if (isLikProductionMode) {
    return css`
      border: none;
    `
  }
  return css`
    border-width: ${WIDGET_SCALE_SQUARE_BORDER_WIDTH}px;
    border-style: ${getWrapperBorderStyle(
      hasEditors,
      isSelected,
      isHover,
      canShowDot,
    )};
    border-color: ${getWrapperBorderColor(
      isLikProductionMode,
      isSelected,
      hasEditors,
      isHover,
      canShowDot,
    )};
  `
}

export const applyWrapperPendingStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  hasError: boolean,
  isEditor: boolean,
  isLimitedModeAndOverLap: boolean = false,
  isLikProductionMode: boolean,
  isHover: boolean,
  canShowDot: boolean,
) => css`
  width: 100%;
  height: 100%;
  padding: ${WIDGET_PADDING}px;
  ${getWrapperBorder(
    isLikProductionMode,
    isSelected,
    hasEditors,
    isHover,
    canShowDot,
  )};
  background-color: ${isEditor && hasError && !isSelected
    ? getColor("red", "07")
    : "transparent"};
  ${isLimitedModeAndOverLap && isSelected
    ? `border-bottom:unset !important`
    : ""}
  ${isEditor && "cursor: move"}
`
