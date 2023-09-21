import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const shadowSelectWrapperStyle = css`
  width: 170px;
  padding: 4px 12px 4px 8px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const shadowSelectStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`

export const shadowIconHotSpotStyle = css`
  flex: none;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  display: flex;
`
