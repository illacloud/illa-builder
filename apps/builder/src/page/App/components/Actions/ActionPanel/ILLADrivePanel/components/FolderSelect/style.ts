import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const folderSelectStyle = css`
  width: 100%;
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
`

export const fileSelectContainerStyle = css`
  display: flex;
  padding: 1px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  & > span {
    color: ${getColor("grayBlue", "02")};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    text-transform: capitalize;
  }
`
export const folderIconStyle = css`
  width: 16px;
  height: 16px;
`

export const headerStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const actionItemTip = css`
  font-size: 14px;
  white-space: pre-line;
  padding-left: 16px;
  min-height: 30px;
  padding-bottom: 8px;
  display: flex;
  align-items: stretch;
  color: ${getColor("grayBlue", "04")};
  align-self: flex-start;
`

export const inputContainerStyle = css`
  width: 100%;
  display: flex;
  position: relative;
  padding-left: 160px;
  padding-right: 16px;
  flex-direction: column;
`

export const actionItemCodeEditorStyle = css`
  width: 100%;
  margin: 0 0 8px 16px;
`

export const nameStyle = css`
  display: flex;
  width: 160px;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`
