import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const rowSuggestComponentContainerStyle = css`
  width: 100%;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const columnSuggestComponentContainerStyle = css`
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const sessionTitleStyle = css`
  line-height: 22px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  margin: 0;
  padding: 0;
  color: ${getColor("grayBlue", "02")};
`

export const columnSessionTitleStyle = css`
  ${sessionTitleStyle};
  text-align: center;
`
