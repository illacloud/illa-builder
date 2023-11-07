import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const uploadDetailContainerStyle = css`
  padding: 5px 16px;
  border-radius: 16px;
  background-color: ${getColor("white", "01")};
  position: absolute;
  bottom: 0;
  right: 50%;
  color: ${getColor("grayBlue", "02")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  border: 1px solid ${getColor("grayBlue", "08")};
`

export const controllerAreaContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
`

export const processingTextStyle = css`
  font-size: 14px;
  line-height: 22px;
`

export const placeholderIconStyle = css`
  display: inline-block;
  width: 12px;
  height: 12px;
`

export const closeIconStyle = css`
  width: 12px;
  height: 12px;
  background-color: ${getColor("grayBlue", "01")};
  color: white;
  display: flex;
  align-items: center;
  font-size: 8px;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`
