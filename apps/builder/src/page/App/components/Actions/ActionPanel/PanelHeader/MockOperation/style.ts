import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const mockOperationContainerStyle = css`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
`

export const mockOperationTitleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
