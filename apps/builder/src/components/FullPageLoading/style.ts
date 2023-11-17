import { css } from "@emotion/react"

export const fullPageLoadingWrapperStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`

export const maskStyle = css`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0.7;
  background-color: white;
`
