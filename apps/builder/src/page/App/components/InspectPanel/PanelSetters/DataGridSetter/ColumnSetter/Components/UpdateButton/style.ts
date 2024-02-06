import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const updateButtonContainerStyle = css`
  display: flex;
  padding: 5px 8px;
  gap: 8px;
  align-items: center;
  border: none;
  background-color: transparent;
  color: ${getColor("orange", "03")};
  font-size: 14px;
  cursor: pointer;
`

export const basicUpdateButtonContainerStyle = css`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${getColor("grayBlue", "02")};
`
