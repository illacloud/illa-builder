import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { EditorInputState } from "./interface"

export const codemirrorStyle = css`
  .cm-illa-expression {
    background: #f5fdfa;
    color: ${globalColor(`--${illaPrefix}-green-03`)};
  }
`

export const inputErrorStyle = css`
  border-color: ${globalColor(`--${illaPrefix}-red-03`)};

  &:hover {
    border-color: ${globalColor(`--${illaPrefix}-red-02`)};
  }
`

export function applyCodeEditorStyle(
  inputState: EditorInputState,
): SerializedStyles {
  let stateStyle = css``
  const stateColor = inputState.error ? "red" : "techPurple"
  if (inputState.focus) {
    stateStyle = css`
      border-radius: 8px 8px 0 0;
      border-color: ${globalColor(`--${illaPrefix}-${stateColor}-03`)};
      box-shadow: 0 0 8px 0
        ${chroma(globalColor(`--${illaPrefix}-${stateColor}-01`))
          .alpha(0.15)
          .hex()};
    `
  } else if (inputState.error) {
    stateStyle = inputErrorStyle
  } else {
    stateStyle = css`
      border-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};

      &:hover {
        border-color: ${globalColor(`--${illaPrefix}-techPurple-06`)};
      }
    `
  }

  return css`
    & > .CodeMirror {
      height: ${inputState.height};
      border-radius: 8px;
      border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
      transition: all 200ms ease-in-out;
      ${stateStyle}
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
