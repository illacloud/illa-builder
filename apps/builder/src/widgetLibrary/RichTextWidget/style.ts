import { css } from "@emotion/react"

export const containerStyle = css`
  height: 100%;
  width: 100%;
`
export const editorStyle = css`
  width: 100%;
  padding: 24px 60px;
  .codex-editor__redactor {
    padding-bottom: 0 !important;
  }
  .ce-block__content {
    width: 100%;
    margin: 0;
    max-width: 100%;
    & * {
      cursor: text;
    }
  }
  .ce-toolbar__content {
    width: 100%;
    max-width: 100%;
  }
`
