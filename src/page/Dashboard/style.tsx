import { css, SerializedStyles } from "@emotion/react"

export function applyContainer(): SerializedStyles {
  return css`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  `
}
