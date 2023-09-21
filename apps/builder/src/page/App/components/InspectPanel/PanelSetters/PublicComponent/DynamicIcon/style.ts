import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyCustomIconStyle = (
  isDynamic: boolean = false,
  hasRightContent: boolean = false,
): SerializedStyles => {
  return css`
    color: ${isDynamic
      ? getColor("techPurple", "01")
      : getColor("grayBlue", "06")};
    width: 16px;
    height: 16px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${hasRightContent ? "10px" : 0};

    :hover {
      cursor: pointer;
      color: ${getColor("techPurple", "01")};
    }
  `
}
