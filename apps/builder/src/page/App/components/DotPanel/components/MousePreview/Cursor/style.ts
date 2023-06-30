import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const nickNameContainerStyle = (bgColor: string) => css`
  min-width: 32px;
  max-width: 102px;
  padding: 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${bgColor};
  border: 1px solid ${getColor("white", "01")};
  border-radius: 4px;
  color: ${getColor("white", "01")};
  font-size: 12px;
  font-weight: 500;
`

export const applyCursorContainerStyle = (color: string) => css`
  color: ${color};
  z-index: 10;
  position: absolute;
  user-select: none;
  pointer-events: none;
  top: 0;
  left: 0;
`
