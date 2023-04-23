import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyControllerContainerStyle = (disable?: boolean) => css`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  gap: 16px;
  align-items: center;
  opacity: ${!!disable ? 0.3 : 1};
`

export const subtitleStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
`
export const controlTitleStyle = css`
  width: 240px;
  flex: none;
  text-align: right;
  margin: 0;
  ${subtitleStyle};
`

export const controlWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: relative;
`

export const notAllowedMask = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`
