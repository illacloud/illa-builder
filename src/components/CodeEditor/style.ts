import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const codemirrorStyle = css`
  .cm-illa-expression {
    background: #f5fdfa;
    color: ${globalColor(`--${illaPrefix}-green-03`)};
  }
`

export function applyCodeEditorStyle(height: string): SerializedStyles {
  return css`
    & > .CodeMirror {
      height: ${height};
      border-radius: 8px;
      border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    }

    & > .CodeMirror-empty {
      color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
    }
  `
}

// CodePreview style

export function applyPreviewStyle(state?: string): SerializedStyles {
  const statusColor = state === "error" ? "red" : "green"
  return css`
    background-color: ${globalColor(`--${illaPrefix}-${statusColor}-07`)};
    color: ${globalColor(`--${illaPrefix}-${statusColor}-01`)};
    border-radius: 0px 0px 8px 8px;
    padding: 4px 8px;
    font-family: monospace;
    position: relative;
  `
}

export const iconStyle = css`
  margin-right: 4px;
`

export const copyIconStyle = css`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`

export const typeTextStyle = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
`

export const contentTextStyle = css`
  font-size: 12px;
  font-weight: 400;
  word-wrap: break-word;
`

