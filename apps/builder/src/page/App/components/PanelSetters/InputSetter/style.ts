import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import {
  fixedWidthStyle,
  listSetterWidthStyle,
} from "@/page/App/components/PanelSetters/style"

export const applyInputSetterWrapperStyle = (
  isSetterSingleRow: boolean = false,
  isInList: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : isInList
    ? listSetterWidthStyle
    : fixedWidthStyle
}

export const editableInputSetterStyle = css`
  width: 154px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
`

export const editableInputIconStyle = css`
  width: 24px;
  height: 24px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const inputWithSelectSetterStyle = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  ${publicPaddingStyle};
`

export const sizeDropListStyle = css`
  width: 100px;
  padding: 8px 0;
  font-size: 14px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const dropListItemStyle = css`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
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

export const codeEditorWrapperStyle = css`
  flex: 1;
  .cm-editor {
    border-radius: 8px;
  }
`

export const sizeSelectionStyle = css`
  line-height: 26px;
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

export const codeEditorContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 0;
`

export const dashCharStyle = css`
  width: 9px;
  line-height: 22px;
  margin: 0 8px;
  display: flex;
  align-items: center;
`
