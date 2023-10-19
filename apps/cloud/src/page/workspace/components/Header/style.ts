import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 40px 32px;
  align-items: center;
`

export const innerHeaderContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin: 0;
  white-space: nowrap;
`

export const actionGroupContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`
