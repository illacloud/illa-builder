import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const sheetConfigContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const spreadsheetContainerStyle = css`
  display: flex;
  position: relative;
  width: 50%;
`

export const fxIconStyle = css`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 16px;
  right: -16px;
  color: ${getColor("grayBlue", "04")};
  cursor: pointer;
  z-index: 1;
`
