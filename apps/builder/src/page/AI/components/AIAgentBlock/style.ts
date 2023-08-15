import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentBlockStyle = css`
  margin-top: 8px;
  padding: 8px 24px;
  width: 100%;
`

export function applyBlockTextStyle(
  renderBottomLine?: boolean,
): SerializedStyles {
  return css`
    color: ${getColor("grayBlue", "02")};
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    border-bottom: ${renderBottomLine
      ? `1px dashed ${getColor("grayBlue", "06")}`
      : "none"};
  `
}

export const blockRequireStyle = css`
  margin-left: 4px;
`

export const blockTitleContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

export function applyBlockSubtitleStyle(
  renderBottomLine?: boolean,
): SerializedStyles {
  return css`
    display: inline-flex;
    align-items: center;
    border-bottom: ${renderBottomLine
      ? `1px dashed ${getColor("grayBlue", "06")}`
      : "none"};
  `
}
