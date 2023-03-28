import { css } from "@emotion/react"

export const applyModalFooterWrapperStyle = (
  hasChildren: boolean,
  footerH?: number,
) => css`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: auto;
  padding: 0 16px;
  height: ${footerH ? `${footerH}px` : hasChildren ? "64px" : "16px"};
  flex: none;
`

export const resizeBarIconStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
`
