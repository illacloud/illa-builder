import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const missingButtonStyle = css`
  display: flex;
  padding: 5px 8px;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  background-color: ${getColor("orange", "08")};
  border: none;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
  cursor: pointer;
`
