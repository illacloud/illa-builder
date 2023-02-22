import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const actionPanelStyle = css`
  flex-grow: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const actionContentStyle = css`
  padding-bottom: 48px;
  width: 100%;
  min-width: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const publicCodeMirrorStyleInActionPanel = css`
  flex-grow: 1;
  width: 0;
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

export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const panelContainerStyle = css`
  display: flex;
  flex-direction: column;
`
