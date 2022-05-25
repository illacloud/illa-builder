import { css, SerializedStyles } from "@emotion/react"

export function applyContainerStyle(): SerializedStyles {
  return css`
    box-sizing: border-box;
    height: 48px;
    width: 100%;
  `
}
