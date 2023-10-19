import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerOuterContainerStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const headerContainerStyle = css`
  width: 1032px;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const titleContainerStyle = css`
  width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const titleNameContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const titleNameStyle = css`
  font-size: 16px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
  padding: 0;
`

export const buttonContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`
