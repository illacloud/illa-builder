import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const smtpContainerStyle = css`
  display: flex;
  flex-direction: column;
`
export const smtpItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const topDivider = css`
  min-height: 8px;
`

export const smtpItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const smtpBodyTypeStyle = css`
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

export const smtpItemCodeEditorStyle = css`
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
