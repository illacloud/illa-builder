import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const senderMessageStyle = css`
  background: ${getColor("grayBlue", "09")};
  max-width: 100%;
  overflow-x: hidden;
  word-break: break-word;
  padding: 8px 12px;
  margin-top: 4px;
  border-radius: 8px;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  white-space: pre-wrap;
  font-weight: 400;
  line-height: 22px;
`
