import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const itemStyle = css`
  padding: 24px;
  width: 380px;
  position: relative;
  display: flex;
  gap: 16px;
  cursor: pointer;
  border: solid 1px ${getColor("grayBlue", "09")};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  &:hover {
    border-color: ${getColor("techPurple", "01")};
  }
`

export const iconStyle = css`
  width: 40px;
  height: 40px;
  background: #83ffb4;
  border-radius: 4px;
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${getColor("grayBlue", "02")};
`
export const descStyle = css`
  margin-top: 4px;
  width: 188px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${getColor("grayBlue", "02")};
`

export const forkItemStyle = css`
  display: flex;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
`

export const forkIconStyle = css`
  width: 16px;
  height: 16px;
`
