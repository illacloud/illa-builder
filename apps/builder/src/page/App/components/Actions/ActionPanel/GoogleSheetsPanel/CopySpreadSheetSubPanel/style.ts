import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const sheetConfigContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const spreadsheetContainerStyle = css`
  align-items: center;
  display: flex;
  flex: 1;
`

export const fxIconStyle = css`
  width: 16px;
  height: 16px;
  color: ${getColor("grayBlue", "04")};
  cursor: pointer;
  z-index: 1;
`
