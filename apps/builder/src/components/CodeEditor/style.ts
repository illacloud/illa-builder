import chroma from "chroma-js"
import "@fontsource/fira-code"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { EditorInputState } from "./interface"
import { ternStyle } from "@/components/CodeEditor/TernSever/style"

export const codemirrorStyle = css`
  .CodeMirror {
    font-family: "Fira Code", monospace;
  }

  .CodeMirror-empty {
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  }

  .CodeMirror-selected {
    background: ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
      .alpha(0.12)
      .hex()};
  }

  .CodeMirror-focused .CodeMirror-selected {
    background: ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
      .alpha(0.12)
      .hex()};
  }

  .CodeMirror-crosshair {
    cursor: crosshair;
  }

  .CodeMirror-lines {
    padding: 7px 0;
  }

  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    padding: 0 8px;
  }

  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
      .alpha(0.12)
      .hex()};
  }

  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
      .alpha(0.12)
      .hex()};
  }

  ${ternStyle}
  .CodeMirror-hints {
    font-family: "Fira Code", monospace;
    min-width: 289px;
    padding: 2px 0;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    border-radius: 8px;
    box-shadow: 0 2px 16px 0 ${globalColor(`--${illaPrefix}-blackAlpha-05`)};
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};

    ::-webkit-scrollbar {
      display: none;
    }
  }

  li.CodeMirror-hint-active {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }

  li.CodeMirror-hint {
    margin: 1px 0;
    transition: 0.2s ease-in-out;

    &:hover {
      background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  }

  .cm-default .cm-illa-expression {
    background: ${chroma(globalColor(`--${illaPrefix}-green-03`))
      .alpha(0.08)
      .hex()};
    color: ${globalColor(`--${illaPrefix}-green-03`)};
  }

  .cm-error .cm-illa-expression {
    background: ${chroma(globalColor(`--${illaPrefix}-red-03`))
      .alpha(0.08)
      .hex()};
    color: ${globalColor(`--${illaPrefix}-red-03`)};
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
  const stateColor = inputState.error ? "red" : "green"
  if (inputState.focus) {
    stateStyle = css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
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
      max-height: ${inputState.maxHeight};
      border-radius: ${inputState.borderRadius};
      border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
      transition: border 200ms ease-in-out;
      line-height: 16px;
      font-size: 12px;

      ${stateStyle}
      .CodeMirror-scroll {
        max-height: ${inputState.maxHeight};
      }

      ${inputState?.border ? css({ border: inputState?.border }) : null}
    }
  `
}

// CodePreview style

export function applyPreviewStyle(state?: string): SerializedStyles {
  const statusColor = state === "error" ? "red" : "green"
  return css`
    background-color: ${globalColor(`--${illaPrefix}-${statusColor}-07`)};
    color: ${globalColor(`--${illaPrefix}-${statusColor}-01`)};
    border-radius: 0 0 8px 8px;
    padding: 4px 8px;
    font-family: "Fira Code", monospace;
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
