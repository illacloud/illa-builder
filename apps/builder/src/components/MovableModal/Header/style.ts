import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerWrapperStyle = css`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: none;
  padding: 0 16px 0 4px;
`

export const draggableAndTitleStyle = css`
  display: flex;
  font-size: 16px;
  align-items: center;
  gap: 8px;
  color: ${getColor("grayBlue", "04")};
`

export const titleStyle = css`
  font-weight: 600;
  color: ${getColor("grayBlue", "02")};
`

export const closeButtonHotSpotStyle = css`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${getColor("grayBlue", "02")};
`
