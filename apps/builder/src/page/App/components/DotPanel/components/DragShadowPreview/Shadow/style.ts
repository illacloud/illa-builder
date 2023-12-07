import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const dotLintRectangleStyle = css`
  border: 1px dashed ${getColor("techPurple", "03")};
  position: absolute;
  z-index: 6;
  pointer-events: none;
`

export const applyResizingDotLintRectangleStyle = (
  w: number,
  h: number,
  x: number,
  y: number,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    top: 0;
    left: 0;
    transform: translate(${x}px, ${y}px);
    border: 1px dashed ${getColor("techPurple", "03")};
    position: absolute;
    z-index: 6;
    pointer-events: none;
  `
}

export const rectangleStyle = css`
  width: 100%;
  height: 100%;
  background-color: ${getColor("techPurple", "03")};
  opacity: 0.16;
  pointer-events: none;
`
