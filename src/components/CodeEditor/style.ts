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
  `
}
