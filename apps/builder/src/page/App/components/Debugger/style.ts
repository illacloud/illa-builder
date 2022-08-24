import { css } from "@emotion/react"

export function applyDebuggerStyle(h: number) {
  return css`
    position: absolute;
    width: 100%;
    height: ${h}px;
  `
}