import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const iconHotSpotContainerStyle = css`
  padding: 6px;
  font-size: 12px;
  cursor: pointer;
  color: ${getColor("grayBlue", "04")};
  :hover {
    color: ${getColor("grayBlue", "02")};
  }
`

export const labelContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
`

export const sectionContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
`

export const setterContainerStyle = css`
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
