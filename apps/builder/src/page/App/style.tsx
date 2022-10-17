import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { SerializedStyles } from "@emotion/serialize"
import { LEFT_PANEL_WIDTH, RIGHT_PANEL_WIDTH, NAVBAR_HEIGHT } from "@/style"

export const editorContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

export const contentStyle = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background: #fafafb;
  flex-grow: 1;
  width: 100%;
  overflow: auto;
`

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const navbarStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
`

export const leftPanelStyle = css`
  width: ${LEFT_PANEL_WIDTH}px;
  height: 100%;
  min-width: ${LEFT_PANEL_WIDTH}px;
  overflow: auto;
  box-sizing: border-box;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  background: ${globalColor(`--${illaPrefix}-white-01`)};
`

export const centerPanelStyle = css`
  flex-grow: 1;
  height: 0;
  width: 100%;
`

export const bottomPanelStyle = css`
  box-sizing: border-box;
  width: 100%;
`

export const rightPanelStyle = css`
  box-sizing: border-box;
  width: ${RIGHT_PANEL_WIDTH}px;
  min-width: ${RIGHT_PANEL_WIDTH}px;
  height: 100%;
  border-left: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  background: ${globalColor(`--${illaPrefix}-white-01`)};
`

export const middlePanelStyle = css`
  flex-grow: 1;
  min-width: ${RIGHT_PANEL_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${globalColor(`--${illaPrefix}-white-01`)};
`
