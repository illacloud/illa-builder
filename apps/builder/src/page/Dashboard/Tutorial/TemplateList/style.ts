import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const templateStyle = css`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`

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
  align-items: flex-start;

  &:hover {
    border-color: ${getColor("techPurple", "01")};
  }
`

export const iconStyle = css`
  width: 40px;
  height: 40px;
  background: ${getColor("grayBlue", "09")};
  border-radius: 4px;
  flex: none;
`

export const contentStyle = css`
  width: 188px;
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${getColor("grayBlue", "02")};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
export const descStyle = css`
  margin-top: 4px;
  width: 188px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${getColor("grayBlue", "02")};
  text-overflow: ellipsis;
  white-space: break-spaces;
  overflow: hidden;
`

export const forkItemStyle = css`
  padding: 5px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background: ${getColor("grayBlue", "09")};
  }
`

export const forkIconStyle = css`
  width: 16px;
  height: 16px;
  flex: none;
`
