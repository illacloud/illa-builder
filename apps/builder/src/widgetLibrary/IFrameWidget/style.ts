import { SerializedStyles, css } from "@emotion/react"

export function applyIframeContainer(isDragging: boolean): SerializedStyles {
  return css`
    pointer-events: ${isDragging ? "none" : "auto"};
    border: none;
    height: 100%;
    width: 100%;
  `
}
