import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const triggerStyle = css`
  margin-top: 20px;
`

export const nameStyle = css`
  font-weight: 500;
  line-height: 18px;
  color: ${getColor("grayBlue", "02")};
`

export const nameContainerStyle = css`
  display: inline-flex;
  gap: 8px;
  cursor: pointer;
  height: 18px;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  & > svg {
    display: none;
  }
  &:hover > svg {
    display: block;
    align-self: flex-start;
  }
`
