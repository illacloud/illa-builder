import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const iconHotSpotContainerStyle = (
  iconSize: number = 16,
  activeColor = getColor("grayBlue", "02"),
  inactiveColor = getColor("grayBlue", "04"),
) => css`
  padding: 4px;
  border-radius: 4px;
  font-size: ${iconSize}px;
  color: ${inactiveColor};
  cursor: pointer;
  width: ${iconSize + 4 * 2}px;
  height: ${iconSize + 4 * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  :hover {
    color: ${activeColor};
    background-color: ${getColor("grayBlue", "09")};
  }
`
