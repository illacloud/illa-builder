import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const esContainerStyle = css`
  display: flex;
  flex-direction: column;
`
export const esItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const esItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const esItemCodeEditorStyle = css`
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
