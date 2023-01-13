import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const getEditorWrapperBorderColor = (
  hasError: boolean,
  isFocused: boolean,
  isHovered: boolean,
) => {
  if (hasError) {
    return getColor("red", "03")
  }
  if (isFocused) {
    return getColor("green", "03")
  }
  return isHovered ? getColor("techPurple", "06") : getColor("grayBlue", "08")
}

export const applyEditorWrapperStyle = (
  hasError: boolean,
  isFocused: boolean,
) => {
  return css`
    border: 1px solid ${getEditorWrapperBorderColor(hasError, isFocused, false)};
    width: 100%;
    border-radius: ${isFocused ? "8px 8px 0px 0px;" : "8px"};
    :hover {
      border: 1px solid
        ${getEditorWrapperBorderColor(hasError, isFocused, true)};
    }
  `
}
