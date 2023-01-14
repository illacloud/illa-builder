import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const codeEditorLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  align-self: start;
`

export const checkboxItemStyle = css`
  min-width: 160px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  margin-left: 10px;
  text-align: left;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
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
