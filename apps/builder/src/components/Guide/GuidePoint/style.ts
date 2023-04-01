import { css } from "@emotion/react"

export const popoverStyle = css`
  width: 32px;
  height: 32px;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
`
