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
  min-width: 176px;
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
  gap: 4px;
  margin-left: 16px;
  margin-right: 24px;
`

export const docItemStyle = css`
  height: 22px;
  padding: 2px 4px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
  &:not(:first-child) {
    cursor: pointer;
    color: ${getColor("techPurple", "01")};
  }
  & > svg {
    width: 12px;
    height: 12px;
  }
`
