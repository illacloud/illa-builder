import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const recordEditorContainerStyle = css`
  display: flex;
  flex-direction: row;
`

export const recordEditorStyle = css`
  display: flex;
  flex-direction: column;
`

export const recordStyle = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
`

export const recordNewButton = css`
  margin-bottom: 8px;
`

export const recordEditorLabelStyle = css`
  min-width: 200px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
