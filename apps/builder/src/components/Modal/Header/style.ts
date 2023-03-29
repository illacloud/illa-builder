import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerWrapperStyle = css`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: none;
  padding: 16px;
  position: relative;
`

export const applyTitleStyle = (canMove?: boolean) => css`
  font-size: 16px;
  font-weight: 600;
  color: ${getColor("grayBlue", "02")};
  padding-left: ${canMove ? "8px" : "0px"};
  display: inline-block;
  width: calc(100% - 32px);
  overflow: hidden;
  text-overflow: ellipsis;
`

export const closeButtonHotSpotStyle = css`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  right: 16px;
  color: ${getColor("grayBlue", "02")};
`

export const dragIconStyle = css`
  position: absolute;
  left: 4px;
  color: ${getColor("grayBlue", "04")};
  font-size: 16px;
`
