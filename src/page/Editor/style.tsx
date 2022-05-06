import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const editorContainerStyle = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`

export const mainPanelStyle = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-grow: 1;
`

export const navbarStyle = css`
  width: 100%;
  height: 35px;
`

export const contentStyle = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-grow: 1;
`

export const leftPanelStyle = css`
  width: 280px;
  height: 100%;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const centerPanelStyle = css`
  flex-grow: 1;
  width: 100%;
`

export const bottomPanelStyle = css`
  height: 300px;
  width: 100%;
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const rightPanelStyle = css`
  width: 320px;
  height: 100%;
  border-left: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const middlePanelStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`
