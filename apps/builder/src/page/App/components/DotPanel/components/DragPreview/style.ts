import { css } from "@emotion/react"

export const dragPreviewStyle = (
  top: number,
  left: number,
  width: number,
  height: number,
) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
  transform: translate(${left}px, ${top - 1}px);
  background-color: rgba(101, 74, 236, 0.1);
  border-top: 3px solid #654aec;
  z-index: 10;
`
