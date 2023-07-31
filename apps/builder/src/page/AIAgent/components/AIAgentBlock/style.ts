import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentBlockStyle = css`
  margin-top: 8px;
  padding: 8px 24px;
`

export const blockTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  flex-grow: 1;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 22px;
`

export const blockTitleContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export function applyBlockSubTitleStyle(
  renderBottomLine?: boolean,
): SerializedStyles {
  return css`
    display: inline-flex;
    align-items: center;
    margin-bottom: 8px;
    border-bottom: ${renderBottomLine
      ? `1px dashed ${getColor("grayBlue", "06")}`
      : "none"};
  `
}
