import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const optionListHeaderStyle = css`
  width: 100%;
  background-color: ${getColor("grayBlue", "09")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  padding: 0 16px;
`

export const optionListLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
`
export const listStyle = css`
  border: 1px solid ${getColor("grayBlue", "08")};
  margin: 0 16px;
  border-radius: 8px;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`
