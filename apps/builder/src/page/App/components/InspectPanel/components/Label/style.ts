import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const getLabelStyleBySize = (size: "medium" | "small") => {
  switch (size) {
    case "medium": {
      return css`
        font-size: 14px;
        color: ${getColor("grayBlue", "02")};
      `
    }
    case "small": {
      return css`
        font-size: 12px;
        color: ${getColor("grayBlue", "03")};
      `
    }
  }
}

export function applyLabelTipsStyle(
  hasLabelDesc: boolean,
  size: "medium" | "small",
) {
  const borderBottomStyle = hasLabelDesc
    ? css`
        border-bottom: 1px dashed ${getColor("grayBlue", "06")};
      `
    : css``
  return css`
    height: 22px;
    line-height: 22px;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    ${getLabelStyleBySize(size)}
    ${borderBottomStyle};
  `
}
