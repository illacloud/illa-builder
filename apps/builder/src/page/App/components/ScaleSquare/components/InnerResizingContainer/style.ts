import { css } from "@emotion/react"

export const resizingContainerStyle = (
  width: number,
  height: number,
  minWidth: number,
  minHeight: number,
) => css`
  width: ${width}px;
  height: ${height}px;
  min-width: ${minWidth}px;
  min-height: ${minHeight}px;
  position: relative;
`
