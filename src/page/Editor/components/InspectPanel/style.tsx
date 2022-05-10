import { css } from "@emotion/react"

const publicPaddingCss = css`
  padding: 0 16px;
  box-sizing: border-box;
`

export const headerWrapperCss = css`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  ${publicPaddingCss}
`

export const headerIconWrapperCss = css`
  cursor: pointer;
`
