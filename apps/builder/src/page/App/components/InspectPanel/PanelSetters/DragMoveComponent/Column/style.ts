import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const dragIconStyle = css`
  visibility: hidden;
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
  &:hover {
    .dragIcon {
      visibility: visible;
    }
  }
`
export const columnLabelContainerStyle = css`
  display: flex;
  flex-grow: 1;
  cursor: pointer;
  height: 22px;
  overflow: hidden;
  gap: 8px;
`

export const columnLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  line-height: 22px;
  max-width: 180px;
  overflow: hidden;
`

export const baseModalContainerStyle = css`
  max-height: 800px;
  overflow-y: auto;
`
