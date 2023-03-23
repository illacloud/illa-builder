import { css } from "@emotion/react"

export const applyModalBodyWrapperStyle = (hasFooterChildren: boolean) => css`
  width: 100%;
  height: calc(100% - 48px - ${hasFooterChildren ? "64px" : "16px"});
  cursor: auto;
  padding: 0 16px;
`
