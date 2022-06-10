import {css, SerializedStyles} from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const codemirrorStyle = css`
  .cm-illa-expression {
    background: #F5FDFA;
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