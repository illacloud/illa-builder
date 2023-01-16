import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

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
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
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
