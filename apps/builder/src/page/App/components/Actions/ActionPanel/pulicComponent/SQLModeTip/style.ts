import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modeTipContainerStyle = css`
  padding: 16px;
  margin-top: 8px;
  border-radius: 4px;
  gap: 8px;
  background-color: ${getColor("orange", "08")};
`

export const modeTipHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const warnIconStyle = css`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${getColor("orange", "03")};
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

export const iconStyle = css`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const modeTipContentStyle = css`
  display: flex;
  padding-left: 24px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`
