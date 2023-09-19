import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const baseLabelStyle = css`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ListLabelStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export function applyLabelStyle(isInList?: boolean) {
  return isInList ? ListLabelStyle : baseLabelStyle
}

export function applyLabelTipsStyle(
  isInList?: boolean,
  hasLabelDesc?: boolean,
) {
  const labelStyle = applyLabelStyle(isInList)
  const borderBottomStyle = hasLabelDesc
    ? css`
        border-bottom: 1px dashed ${getColor("grayBlue", "06")};
      `
    : css``
  return css`
    height: 22px;
    line-height: 22px;
    ${labelStyle};
    ${borderBottomStyle};
  `
}
