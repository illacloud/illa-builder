import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  recordKeyStyle,
  recordValueStyle,
} from "@/components/RecordEditor/style"

export const bodyEditorContainerStyle = css`
  display: flex;
  padding: 0 16px;
  flex-direction: row;
`

export const bodyLabelStyle = css`
  min-width: 160px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
`

export const bodyChooserStyle = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 16px;
`

export const bodySelectorStyle = css`
  display: flex;
  height: 48px;
  align-items: center;
  flex-direction: row;
`

export const codeEditorStyle = css`
  margin: 8px 0;
`

export const restRecordKeyStyle = css`
  ${recordKeyStyle};
  margin-right: -1px;
`

export const restRecordValueStyle = css`
  ${recordValueStyle};
  & .cm-scroller {
    overflow-x: hidden;
  }
`
