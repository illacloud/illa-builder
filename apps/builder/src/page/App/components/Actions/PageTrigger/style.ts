import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const pageTriggerContainer = css`
  height: 100%;
  width: 100%;
`

export const pageTriggerTitleStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  height: 22px;
  display: inline-block;
  color: ${getColor("grayBlue", "04")};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
`
