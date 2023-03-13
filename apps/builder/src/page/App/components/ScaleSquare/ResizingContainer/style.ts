import { css } from "@emotion/react"

export const applyRNDWrapperStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  isLikeProductionMode: boolean,
) => {
  if (isLikeProductionMode) {
    return css`
      z-index: 0;
    `
  }

  return css`
    z-index: ${hasEditors || isSelected ? 5 : 1};
    :hover {
      z-index: 6;
    }
  `
}
