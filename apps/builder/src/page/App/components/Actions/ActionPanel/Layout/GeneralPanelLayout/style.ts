import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const spaceStyle = css`
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const headerOptionContainerStyle = css`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
`

export const headerOptionTitleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
