import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const emptyStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 122.5px;
  flex-direction: column;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
`
