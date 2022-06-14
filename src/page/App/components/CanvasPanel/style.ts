import { css, SerializedStyles } from "@emotion/react"

export function applyScaleContainerStyle(scale: number): SerializedStyles {
  return css`
    transform: scale(${scale / 100});
    transform-origin: 50% 0;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    width: 100%;
  `
}
