import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { SerializedStyles } from "@emotion/serialize"

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
  flex-grow: 1;
  width: 100%;
`

export const navbarStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: 48px;
`

export function applyLeftPanelStyle(display: boolean): SerializedStyles {
  return css`
    width: 280px;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    ${display ? "" : "display: none"};
  `
}

export const centerPanelStyle = css`
  flex-grow: 1;
  width: 100%;
`

export function applyBottomPanelStyle(display: boolean): SerializedStyles {
  return css`
    box-sizing: border-box;
    width: 100%;
    border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    ${display ? "" : "display: none"};
  `
}

export function applyRightPanelStyle(display: boolean): SerializedStyles {
  return css`
    box-sizing: border-box;
    width: 320px;
    height: 100%;
    border-left: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    ${display ? "" : "display: none"};
  `
}

export const middlePanelStyle = css`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
