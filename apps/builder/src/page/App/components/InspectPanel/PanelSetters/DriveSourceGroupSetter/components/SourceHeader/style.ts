import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const sourceHeaderContainerStyle = css`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const fileSelectContainerStyle = css`
  display: flex;
  padding: 1px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  & > span {
    color: ${getColor("grayBlue", "02")};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-transform: capitalize;
  }
`

export const folderIconStyle = css`
  width: 16px;
  height: 16px;
`
