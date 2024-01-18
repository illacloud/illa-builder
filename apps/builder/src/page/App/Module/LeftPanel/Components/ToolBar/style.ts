import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const ToolBarContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid ${getColor("grayBlue", "08")};
  background-color: white;
  padding: 12px;
  gap: 24px;
`
