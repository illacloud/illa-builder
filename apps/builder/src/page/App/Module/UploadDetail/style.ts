import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const uploadDetailContainerStyle = css`
  padding: 5px 16px;
  padding-right: 8px;
  border-radius: 16px;
  background-color: ${getColor("white", "01")};
  color: ${getColor("grayBlue", "02")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.16);
  width: fit-content;
  pointer-events: all;
`

export const uploadDetailOuterContainerStyle = css`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
`

export const controllerAreaContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  user-select: none;
`

export const processingTextStyle = css`
  font-size: 14px;
  line-height: 22px;
`

export const placeholderIconStyle = css`
  display: inline-block;
  width: 16px;
  height: 16px;
`

export const closeIconStyle = (showButton: boolean) => css`
  color: ${getColor("grayBlue", "06")};
  display: ${showButton ? "flex" : "none"};
  cursor: pointer;
  margin-left: 16px;
  font-size: 16px;
`
