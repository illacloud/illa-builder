import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const container = css`
  width: 100%;
  max-height: 685px;
  overflow-y: auto;
`

export const footerStyle = css`
  height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const labelContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  min-width: 120px;
`

export const docsItemContainerStyle = css`
  display: flex;
  padding-left: 24px;
`

export const docContainerStyle = css`
  height: 24px;
  padding: 2px 0;
  box-sizing: border-box;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-left: 16px;
  margin-right: 24px;
  color: ${getColor("grayBlue", "03")};
`

export const docItemStyle = css`
  height: 22px;
  padding: 2px 0 2px 6px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  color: ${getColor("grayBlue", "03")};
  &:not(:first-of-type) {
    cursor: pointer;
    color: ${getColor("techPurple", "01")};
  }
  &:last-child {
    margin-left: 4px;
  }
  & > svg {
    width: 12px;
    height: 12px;
  }
`

export const labelStyle = css`
  min-width: 120px;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

export const tipsStyle = css`
  font-size: 14px;
  white-space: pre-line;
  color: ${getColor("grayBlue", "04")};
  font-weight: 400;
  margin-left: 136px;
  padding-bottom: 8px;
  padding-left: 24px;
  line-height: 22px;
  height: 30px;
`
