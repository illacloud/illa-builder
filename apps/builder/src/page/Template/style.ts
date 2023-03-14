import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const frameStyle = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background: #fafafb;
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  border: unset;
`

export const forkTextStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-right: 19px;
  color: ${getColor("grayBlue", "02")};
`

export const forkIconStyle = css`
  width: 12px;
  height: 12px;
`
