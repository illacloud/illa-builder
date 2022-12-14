import { css } from "@emotion/react"
import { globalColor, getColor, illaPrefix } from "@illa-design/react"

export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const actionItemCodeEditorStyle = css`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
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

export const actionItemTip = css`
  font-size: 14px;
  margin-left: 192px;
  white-space: pre-line;
  padding-bottom: 6px;
  color: ${getColor("grayBlue", "04")};
`
