import { css } from "@emotion/react"
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
) => {
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

export const applyAlignmentStyle = (align?: TableCellAlign) => {
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

export const applyTableButtonGroupStyle = (align?: TableCellAlign) => {
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
