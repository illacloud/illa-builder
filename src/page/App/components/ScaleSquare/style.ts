import { css } from "@emotion/react"

export function applyScaleSquareContainer(h: number, w: number) {
  return css`
    height: ${h}px;
    width: ${w}px;
  `
}
