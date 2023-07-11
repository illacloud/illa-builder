import { css } from "@emotion/react"

export const positionContainerStyle = (
  x: number,
  y: number,
  isDragging: boolean,
  isSelected: boolean,
) => css`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${x}px, ${y}px);
  pointer-events: ${isDragging ? "none" : "auto"};
  display: ${isDragging ? "none" : "block"};
  z-index: ${isSelected ? 5 : 0};
`
