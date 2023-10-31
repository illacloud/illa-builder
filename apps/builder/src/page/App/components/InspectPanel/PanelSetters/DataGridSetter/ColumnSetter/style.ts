import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const optionListHeaderStyle = css`
  width: 100%;
  background-color: ${getColor("grayBlue", "09")};
  display: flex;
  align-items: center;
  height: 40px;
  box-sizing: border-box;
  padding: 0 16px;
`

export const columnNumStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`

export const columnLabelStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px 8px;
`
