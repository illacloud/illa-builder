import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const restapiPanelContainerStyle = css`
  padding-bottom: 48px;
  width: 100%;
  min-width: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const restapiItemStyle = css`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const restapiItemLabelStyle = css`
  min-width: 100px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const restApiItemSelectStyle = css`
  margin-left: 16px;
  min-width: 160px;
`

export const restapiItemInputStyle = css`
  flex-grow: 1;
  width: 0;
`

export const restApiItemBaseUrlStyle = css`
  margin-left: 8px;
`
