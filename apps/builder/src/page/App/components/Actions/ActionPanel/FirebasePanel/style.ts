import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionContainerStyle = css`
  display: flex;
  flex-direction: column;
`
export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const actionItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const actionBodyTypeStyle = css`
  color: ${getColor("techPurple", "03")};
  cursor: pointer;
  margin-top: 5px;
`

export const checkboxItemStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  text-align: left;
  color: ${getColor("grayBlue", "02")};
`

export const actionItemCodeEditorStyle = css`
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  flex-grow: 1;
  width: 0;
`

export const actionItemRecordEditorStyle = css`
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 0;
  flex-grow: 1;
  width: 0;
`

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

export const checkboxContainer = css`
  padding: 8px 0 16px 0;
`
