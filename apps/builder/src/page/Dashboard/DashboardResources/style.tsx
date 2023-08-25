import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const appsContainerStyle = css`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
`

export const listTitleContainerStyle = css`
  display: flex;
  padding: 24px 15%;
  margin-top: 40px;
  justify-content: space-between;
  align-items: center;
`

export const listTitleStyle = css`
  font-size: 20px;
  font-weight: 500;
  flex-grow: 1;
  color: ${getColor("grayBlue", "02")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
