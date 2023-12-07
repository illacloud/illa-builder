import { SerializedStyles, css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"
import { TableCellAlign } from "@/widgetLibrary/TableWidget/interface"

export const overFlowStyle = css`
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const applyIconContainerStyle = (
  colorScheme?: string,
  disabled?: boolean,
): SerializedStyles => {
  const svgColor = colorScheme
    ? css`
        color: ${colorScheme};
      `
    : css``
  return css`
    width: 16px;
    ${svgColor};
    cursor: ${disabled ? "not-allowed" : "pointer"};

    &:not(:last-of-type) {
      margin-right: 4px;
    }
  }
  `
}

export const applyAlignmentStyle = (
  align?: TableCellAlign,
): SerializedStyles => {
  switch (align) {
    case "left":
      return css`
        text-align: left;
      `
    case "center":
      return css`
        text-align: center;
      `
    case "right":
      return css`
        text-align: right;
      `
  }
  return css``
}
export const applyFlexAlignmentStyle = (
  align?: TableCellAlign,
): SerializedStyles => {
  return css`
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: ${align};
  `
}

export const applyTableButtonGroupStyle = (
  align?: TableCellAlign,
): SerializedStyles => {
  let alignmentStyle
  switch (align) {
    case "left":
      alignmentStyle = css`
        justify-content: left;
      `
      break
    case "center":
      alignmentStyle = css`
        justify-content: center;
      `
      break
    case "right":
      alignmentStyle = css`
        justify-content: right;
      `
      break
  }
  return css`
    width: 100%;
    ${alignmentStyle};
  `
}

export const applyTableCellBackgroundStyle = (
  color?: string,
): SerializedStyles => {
  if (color) {
    return css`
      background-color: ${getSpecialThemeColor(color)};
    `
  }
  return css``
}
