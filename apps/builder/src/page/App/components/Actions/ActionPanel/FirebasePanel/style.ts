import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const actionContainerStyle = css`
  display: flex;
  flex-direction: column;017
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
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const actionBodyTypeStyle = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  cursor: pointer;
  margin-top: 5px;
`

export const checkboxItemStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  text-align: left;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const actionItemCodeEditorStyle = css`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
`

export const actionItemRecordEditorStyle = css`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 0;
`

export const codeEditorLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  align-self: start;
`

export const actionItemTip = `
 font-size: 14px;
  margin-left: 192px;
  white-space: pre-line;
  padding-bottom: 6px;
  color: ${getColor("grayBlue", "04")};
`
