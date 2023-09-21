import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const codeEditorContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const codeEditorWrapperStyle = css`
  flex: 1;
  .cm-editor {
    border-radius: 8px;
  }
`
export const dashCharStyle = css`
  width: 9px;
  line-height: 22px;
  margin: 0 8px;
  display: flex;
  align-items: center;
`

export const dropListItemStyle = css`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${getColor("grayBlue", "09")};
  }
`

export const inputWithSelectSetterStyle = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 8px 16px;
  gap: 8px;
`

export const labelContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const panelLabelContainerStyle = css`
  width: 66%;
  display: flex;
  align-items: center;
`

export const sizeContainerStyle = css`
  display: flex;
  width: 44px;
  height: 100%;
  z-index: 1;
  gap: 4px;
  cursor: pointer;
  border-left: none;
  align-items: center;
  padding: 2px;
  & > svg {
    width: 12px;
    height: 12px;
  }
`

export const sizeDropListStyle = css`
  width: 100px;
  padding: 8px 0;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const sizeSelectionStyle = css`
  line-height: 26px;
`
