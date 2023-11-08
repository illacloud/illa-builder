import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import { LEFT_PANEL_WIDTH, NAVBAR_HEIGHT, RIGHT_PANEL_WIDTH } from "@/style"

export const editorContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
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
  flex: none;
`

export const leftPanelStyle = css`
  width: ${LEFT_PANEL_WIDTH}px;
  height: 100%;
  min-width: ${LEFT_PANEL_WIDTH}px;
  overflow: hidden;
  box-sizing: border-box;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  padding-bottom: 48px;
`

export const centerPanelStyle = css`
  height: 100%;
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

export const modalStyle = css`
  position: absolute;
  top: 47px;
  width: 100vw;
  height: calc(100vh - 47px);
  z-index: 100;
  display: flex;
  justify-content: center;
  user-select: none;
`

export const messageWrapperStyle = css`
  position: absolute;
  top: 17px;
  height: 40px;
  background-color: ${getColor("white", "01")};
  padding: 9px 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const waringIconStyle = css`
  color: ${getColor("orange", "03")};
  font-size: 16px;
`
