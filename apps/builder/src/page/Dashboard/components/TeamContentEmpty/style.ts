import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const emptyStyle = css`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`

export const emptyTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-weight: 600;
  line-height: 22px;
`