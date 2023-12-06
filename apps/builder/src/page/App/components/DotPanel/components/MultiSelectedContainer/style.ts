import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyMultiSelectedScaleSquareStyle = (
  width: number,
  height: number,
  left: number,
  top: number,
) => {
  return css`
    position: absolute;
    border: 1px dashed ${getColor("techPurple", "03")};
    width: ${width}px;
    height: ${height}px;
    left: 0;
    top: 0;
    transform: translate(${left}px, ${top}px);
    pointer-events: none;
  `
}
