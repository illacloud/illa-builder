import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerContainerStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 16px 20px;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const headerStyle = css`
  margin: 0;
  padding: 0;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
  line-height: 22px;
  font-size: 14px;
`
