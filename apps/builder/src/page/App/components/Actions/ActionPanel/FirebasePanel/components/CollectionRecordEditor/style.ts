import { css } from "@emotion/react"

export const codeMirrorWrapperLabelStyle = css`
  .cm-editor {
    border-radius: 8px 0 0 8px;
  }
`
export const codeMirrorWrapperValueStyle = css`
  .cm-editor {
    border-radius: 0;
  }
`

export const selectContainerStyle = css`
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
  &:hover {
    overflow: visible;
  }
  & > div {
    position: absolute;
    left: -1px;
    right: -1px;
    top: 8px;
    bottom: 8px;
    width: auto;
    z-index: 2;
  }
`
