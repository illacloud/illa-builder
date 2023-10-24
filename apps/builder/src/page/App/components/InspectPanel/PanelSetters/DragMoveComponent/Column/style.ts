import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const dragIconStyle = css`
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

export const columnContainerStyle = css`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  flex-direction: row;
`
export const columnLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  flex-grow: 1;
  cursor: pointer;
  font-size: 14px;
  font-style: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  line-height: 22px;
`
