import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const ipListContainerStyle = css`
  padding: 8px 0;
`

export const ipListStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
`

export const whiteListContentContainerStyle = css`
  width: 100%;
  padding-top: 16px;
  display: flex;
  height: 82px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`

export const whiteListContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  gap: 4px;
`

export const whiteListTitleStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
  height: 22px;
`
export const whiteListDescriptionStyle = css`
  height: 40px;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "04")};
`

export const whiteListButtonContainerStyle = css`
  width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
`
export const whiteListOperationIconStyle = css`
  width: 12px;
  height: 12px;
  cursor: pointer;
  display: flex;
  color: ${getColor("grayBlue", "04")};
  & > svg {
    width: 12px;
    height: 12px;
  }
`

export const whiteListButtonStyle = css`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 8px;
  width: 100px;
  height: 32px;
  cursor: pointer;
  font-size: 12px;
  background: ${getColor("grayBlue", "09")};
  & > span {
    line-height: 20px;
    color: ${getColor("grayBlue", "02")};
  }
`
