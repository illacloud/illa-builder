import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const settingHeaderStyle = css`
  width: 100%;
  padding: 40px 0px;
  display: flex;
  justify-content: space-between;
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin: 0;
  padding: 0;
`
