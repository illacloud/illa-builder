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

export const getFxIconStyle = (fullwidth: boolean, selected?: boolean) => {
  const hasRightMargin = fullwidth
    ? css`
        margin-right: 16px;
      `
    : css``
  return css`
    width: 16px;
    height: 16px;
    color: ${selected
      ? getColor("techPurple", "03")
      : getColor("grayBlue", "04")};
    cursor: pointer;
    z-index: 1;
    ${hasRightMargin};
    :hover {
      cursor: pointer;
      color: ${getColor("techPurple", "03")};
    }
  `
}
