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
  align-items: center;
  flex: 1;
`

export const getFxIconStyle = (fullwidth: boolean) => {
  const hasRightMargin = fullwidth
    ? css`
        margin-right: 16px;
      `
    : css``
  return css`
    width: 16px;
    height: 16px;
    color: ${getColor("grayBlue", "04")};
    cursor: pointer;
    z-index: 1;
    ${hasRightMargin};
  `
}
