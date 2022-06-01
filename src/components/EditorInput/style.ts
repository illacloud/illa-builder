import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyCMStyle(height: string): SerializedStyles {
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

export function applyHintBodyStyle(params: any): SerializedStyles {
  return css`
    position: absolute;
    top: ${params.top}px;
    left: ${params.left}px;
    z-index: 3001;
    & > .CodeMirror-hints {
      top: 0 !important;
      left: 0 !important;
      position: unset;
    }
  `
}

export const hintBodyTriggerStyle = css`
  position: relative;
  top: 27px;
`
