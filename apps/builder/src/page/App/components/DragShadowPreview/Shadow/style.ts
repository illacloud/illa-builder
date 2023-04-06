import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyDotLintRectangleStyle = (
  w: number,
  h: number,
  canDrop: boolean,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    border: 1px dashed ${getColor("techPurple", "01")};
    position: absolute;
    z-index: 6;
    pointer-events: none;
  `
}

export const rectangleStyle = css`
  width: 100%;
  height: 100%;
  background-color: ${getColor("techPurple", "01")};
  opacity: 0.16;
  pointer-events: none;
`
