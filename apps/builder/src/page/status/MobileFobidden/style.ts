import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const wrapperStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const contentWrapperStyle = css`
  width: 100%;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const iconWrapperStyle = css`
  width: 60px;
  height: 60px;
`

export const contentStyle = css`
  font-weight: 500;
  font-size: 16px;
  color: ${getColor("grayBlue", "02")};
  font-family: "Inter", serif;
  font-style: normal;
`
