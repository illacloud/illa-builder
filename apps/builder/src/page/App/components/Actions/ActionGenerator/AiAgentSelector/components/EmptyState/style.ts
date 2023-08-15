import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const emptyContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

export const emptyTipsStyle = css`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${getColor("grayBlue", "04")};
`
