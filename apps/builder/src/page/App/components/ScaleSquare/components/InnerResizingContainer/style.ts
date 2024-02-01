import { css } from "@emotion/react"
import { getWrapperBorder } from "../../style"

export const resizingContainerStyle = (
  shapeInfo: {
    width: number
    height: number
    minWidth: number
    minHeight: number
  },
  borderInfo: {
    isLikeProductionMode: boolean
    isSelected: boolean
    hasEditors: boolean
    isHover: boolean
    isDragging: boolean
  },
) => {
  const { width, height, minHeight, minWidth } = shapeInfo
  const {
    isLikeProductionMode: isLikProductionMode,
    isSelected,
    hasEditors,
    isHover,
    isDragging,
  } = borderInfo
  return css`
    width: ${width}px;
    height: ${height}px;
    min-width: ${minWidth}px;
    min-height: ${minHeight}px;
    position: relative;
    ${getWrapperBorder(
      isLikProductionMode,
      isSelected,
      hasEditors,
      isHover,
      isDragging,
    )}
  `
}

export const resizingPlaceholderStyle = css`
  background-color: rgba(101, 74, 236, 0.1);
  width: 100%;
  height: 100%;
`
