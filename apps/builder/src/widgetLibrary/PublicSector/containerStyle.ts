import { css } from "@emotion/react"

export const containerStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
`

export const fixedWidthContainerStyle = css`
  flex: 0 0 auto;
`
export const autoWidthContainerStyle = css`
  flex: 2 1 0;
  min-height: 0;
  min-width: 0;
`
