import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const restapiPanelContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const urlStyle = css`
  width: 200px;
  box-sizing: border-box;
  color: ${getColor("grayBlue", "02")};
  font-weight: 400;
  margin-left: 24px;
  margin-right: 8px;
  border-radius: 8px 0 0 8px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
`

export const restapiItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const restapiItemLabelStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
`

export const restapiItemInputStyle = css`
  flex-grow: 1;
  width: 0;
`
