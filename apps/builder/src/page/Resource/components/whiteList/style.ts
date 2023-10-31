import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const titleContainerStyle = css`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const descriptionContainerStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${getColor("grayBlue", "04")};
`

export const ipListContainerStyle = css`
  padding: 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
`

export const ipItemStyle = css`
  line-height: 22px;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  color: ${getColor("grayBlue", "02")};
`
