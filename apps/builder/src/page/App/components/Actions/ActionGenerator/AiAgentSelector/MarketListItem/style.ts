import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
`

export const infoContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 40px;
`

export const coverStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 5px;
`

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`

export const leftContentStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`

export const nameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const ellipsisStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const descStyle = css`
  ${ellipsisStyle};
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  width: 400px;
`

export const resourceItemSelectedStyle = css`
  background: ${getColor("techPurple", "07")};
`
