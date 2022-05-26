import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const NAV_BAR_HEIGHT = 35

export const editorContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

export const contentStyle = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`

export const mainPanelStyle = css`
  display: flex;
  height: 100%;
  flex-direction: row;
  flex-grow: 1;
`

export const navbarStyle = css`
  width: 100%;
  height: 48px;
`

export const leftPanelStyle = css`
  width: 280px;
  height: 100%;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const centerPanelStyle = css`
  flex-grow: 1;
  width: 100%;
`

export const bottomPanelStyle = css`
  width: 100%;
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const rightPanelStyle = css`
  width: 320px;
  height: 100%;
  border-left: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const middlePanelStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
