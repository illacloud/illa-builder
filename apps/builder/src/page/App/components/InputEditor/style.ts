import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const actionItemCodeEditorStyle = css`
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  flex-grow: 1;
  width: 0;
`

export const codeEditorLabelStyle = css`
  min-width: 160px;
  width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
  min-height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  align-self: start;
`

export const codeEditorSublabelStyle = css`
  color: ${getColor("techPurple", "01")};
  cursor: pointer;
  margin-top: 5px;
`

export const actionItemTip = css`
  font-size: 14px;
  margin-left: 192px;
  white-space: pre-line;
  min-height: 30px;
  padding-bottom: 8px;
  display: flex;
  align-items: stretch;
  color: ${getColor("grayBlue", "04")};
`
