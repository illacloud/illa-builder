import { css } from "@emotion/react"

export const applyRNDWrapperStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  isLikeProductionMode: boolean,
  isDragging: boolean,
) => {
  if (isLikeProductionMode) {
    return css`
      z-index: 0;
    `
  }

  return css`
    pointer-events: ${isDragging ? "none" : "auto"};
    z-index: ${hasEditors || isSelected ? 5 : 1};
    :hover {
      z-index: 6;
    }
  `
}
