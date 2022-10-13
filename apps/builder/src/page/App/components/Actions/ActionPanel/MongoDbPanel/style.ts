import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const mongoContainerStyle = css`
  padding-bottom: 48px;
  width: 100%;
  min-width: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`
export const mongoItemStyle = css`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const mongoItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
