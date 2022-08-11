import { css, SerializedStyles } from "@emotion/react"

export function applyCircleStyle(color: string): SerializedStyles {
  return css`
    background-color: ${color};
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `
}
