import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const codeEditorLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  align-self: start;
`

export const actionItemContainer = css`
  padding: 8px 0;
`
