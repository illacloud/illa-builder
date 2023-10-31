import { css } from "@emotion/react"

export const applyModalBodyWrapperStyle = (footerHeight: number) => css`
  width: 100%;
  height: calc(100% - 48px - ${`${footerHeight}px`});
  cursor: auto;
  padding: 0 16px;
  overflow-y: auto;
`
