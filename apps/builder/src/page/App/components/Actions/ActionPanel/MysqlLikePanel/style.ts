import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const mysqlContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const sqlInputStyle = css`
  margin: 8px 16px;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

export const sqlTransStyle = css`
  padding: 8px 16px;
  display: flex;
  width: 100%;
  align-items: center;
`

export const labelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  position: relative;
`

export const labelTipsStyle = css`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  border-bottom: 1px dashed ${getColor("grayBlue", "06")};
`

export const modeContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`
