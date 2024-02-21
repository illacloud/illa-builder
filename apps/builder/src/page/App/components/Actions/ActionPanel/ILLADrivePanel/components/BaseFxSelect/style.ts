import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const getFxIconStyle = (selected?: boolean) => {
  return css`
    width: 16px;
    height: 16px;
    color: ${selected
      ? getColor("techPurple", "03")
      : getColor("grayBlue", "04")};
    cursor: pointer;
    z-index: 1;
    margin-right: 16px;
    :hover {
      cursor: pointer;
      color: ${getColor("techPurple", "03")};
    }
  `
}
