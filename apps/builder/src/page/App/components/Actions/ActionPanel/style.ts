import { css } from "@emotion/react"

export const actionPanelStyle = css`
  flex-grow: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const actionPanelContainerStyle = css`
  width: 100%;
  height: 100%;
  min-width: 877px;
  position: relative;
  display: flex;
  flex-direction: column;
`

export const actionContentStyle = css`
  padding-bottom: 48px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const panelContainerStyle = css`
  display: flex;
  flex-direction: column;
`
