import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const errorMsgStyle = css`
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("orange", "03")};
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
`
