import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const actionPanelStyle = css`
  display: flex;
  flex-grow: 1;
  min-width: 670px;
  height: 100%;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`

export const actionTitleBarStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  height: 48px;
`

export const actionTitleBarDisplayNameStyle = css`
  width: 280px;
`

export const actionTitleBarSpaceStyle = css`
  flex-grow: 1;
  min-width: 8px;
`

export const actionTitleBarRunStyle = css`
  margin-left: 8px;
`
