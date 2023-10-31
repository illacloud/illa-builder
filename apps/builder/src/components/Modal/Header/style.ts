import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerWrapperStyle = css`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: none;
  padding: 16px;
  padding-left: 4px;
  padding-bottom: 8px;
  position: relative;
`

export const titleStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: ${getColor("grayBlue", "02")};
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 64px);
  flex: none;
`

export const dragIconStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 16px;
  flex: none;
`

export const headerContainerStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
  width: calc(100% - 32px);
`
