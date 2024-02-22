import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-direction: column;
  padding-top: 8px;
`

export const fileListContainerStyle = css`
  position: relative;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

export const labelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
`

export const fileItemStyle = (isError: boolean) => css`
  width: 60px;
  height: 72px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: ${isError ? `1px solid ${getColor("red", "03")}` : "unset"};
`

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: ${getColor("blackAlpha", "04")};
`

export const maskStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  color: ${getColor("white", "01")};
  background-color: ${getColor("blackAlpha", "04")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity ease-in-out 200ms;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`

export const mediaStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  justify-content: center;
  align-items: center;
`
