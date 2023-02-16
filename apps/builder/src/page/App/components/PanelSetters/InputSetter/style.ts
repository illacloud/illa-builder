import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
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
  width: 184px;
`

export const inputWithSelectSetterSelectStyle = css`
  width: 50px;
`

export const sizeDropListStyle = css`
  border-radius: 0px 5px 5px 0px;
  width: 100px;
`

export const sizeDropListCodeEditorStyle = css`
  width: 100%;
  position: relative;
`

export const sizeContainerStyle = css`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  width: 44px;
  height: 100%;
  z-index: 1;
  gap: 4px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  align-items: center;
  padding: 2px;
  border-radius: 0 8px 8px 0;
  & > svg {
    width: 12px;
    height: 12px;
  }
`

export const codeEditorWrapperStyle = css`
  width: 100%;
  .cm-editor {
    border-radius: 8px;
    padding-right: 28px;
  }
`

export const sizeSelectionStyle = css`
  line-height: 30px;
`
