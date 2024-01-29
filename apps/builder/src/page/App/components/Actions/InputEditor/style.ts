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
  line-height: 22px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  align-self: center;
`

export const codeEditorSublabelStyle = css`
  color: ${getColor("techPurple", "03")};
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
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

export const sqlModeTipStyle = (hasTitle: boolean) => css`
  margin-left: ${hasTitle ? "192px" : "32px"};
  margin-top: 0;
  margin-right: 16px;
`
