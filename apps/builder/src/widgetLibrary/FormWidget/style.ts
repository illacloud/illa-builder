import { globalColor, illaPrefix } from "@illa-design/theme"
import { css } from "@emotion/react"
import { FORM_BODY_MARGIN } from "./widgetConfig"
export const formContainerStyle = css`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

export const formHeaderStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white;
`
export const formBodyStyle = css`
  width: 100%;
  height: 100%;
  min-height: 100px;
  background-color: white;
  flex: 1;
  overflow-y: auto;
  margin: ${FORM_BODY_MARGIN}px 0;
`
export const resizeLineStyle = css`
  width: 100%;
  height: 100%;
  cursor: row-resize;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const resizeBarStyle = css`
  fill: ${globalColor(`--${illaPrefix}-white-01`)};
  stroke: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  :hover {
    fill: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    stroke: ${globalColor(`--${illaPrefix}-white-01`)};
  }
  :active {
    fill: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    stroke: ${globalColor(`--${illaPrefix}-white-01`)};
  }
`
