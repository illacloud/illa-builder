import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const markdownMessageStyle = css`
  max-width: 100%;
  overflow-x: hidden;
  word-break: break-word;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  white-space: pre-wrap;
  font-weight: 400;
  line-height: 22px;
`
