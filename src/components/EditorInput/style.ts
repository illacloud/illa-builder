import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyCMCss(height: string): SerializedStyles {
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
