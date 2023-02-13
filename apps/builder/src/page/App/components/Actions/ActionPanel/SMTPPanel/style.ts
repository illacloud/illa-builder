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
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  flex-grow: 1;
  width: 0;
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

export const actionItemContainer = css`
  padding: 8px 0;
`

export const checkoutItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  padding: 0 16px;
`

export const checkoutContentStyle = css`
  min-height: 22px;
  align-self: flex-start;
  display: flex;
  align-items: center;
`
