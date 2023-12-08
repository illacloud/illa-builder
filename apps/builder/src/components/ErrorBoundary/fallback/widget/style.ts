import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const widgetBoundaryWrapperStyle = css`
  width: 100%;
  height: 100%;
  background-color: ${getColor("red", "08")};
  overflow: auto;
`

export const titleWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${getColor("red", "03")};
  font-size: 14px;
  font-weight: 600;
`

export const contentWrapperStyle = css`
  color: ${getColor("red", "03")};
  font-size: 12px;
  line-height: 16px;
`
