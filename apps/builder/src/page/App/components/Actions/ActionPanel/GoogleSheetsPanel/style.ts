import { css } from "@emotion/react"

export const sheetConfigContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const spreadsheetContainerStyle = css`
  display: flex;
  position: relative;
  width: 50%;
`

export const updateEditorKeyContainerStyle = css`
  flex-grow: 2;
  .cm-editor {
    height: 32px;
  }
`

export const updateEditorValueContainerStyle = css`
  flex-grow: 3;
  .cm-editor {
    height: 32px;
  }
`
