import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const titleStyle = css`
  padding: 24px 0;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: ${getColor("grayBlue", "02")};
`

export const cardStyle = css`
  padding: 40px 24px 16px;
  margin-bottom: 40px;
  width: 380px;
  position: relative;
  display: inline-block;
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

export const cardBgStyle = css`
  width: 200px;
  height: 120px;
  position: absolute;
  bottom: 0;
  right: 14px;
  z-index: -1;
`

export const cardTitleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${getColor("grayBlue", "02")};
`

export const cardDescStyle = css`
  margin-top: 12px;
  width: 228px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const cardFooterStyle = css`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("techPink", "01")};
`

export const contentStyle = css`
  margin-top: 40px;
  padding: 0 15%;
`
