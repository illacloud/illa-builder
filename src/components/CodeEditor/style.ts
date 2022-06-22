import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { EditorInputState } from "./interface"

export const codemirrorStyle = css`
  .cm-illa-expression {
    background: #f5fdfa;
    color: ${globalColor(`--${illaPrefix}-green-03`)};
  }

  .CodeMirror-hints {
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

    &:hover {
      background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  }

  .CodeMirror-Tern-completion {
    display: flex;
    padding-left: 30px;
    position: relative;
    line-height: 22px;
  }

  .CodeMirror-Tern-completion:before {
    position: absolute;
    left: 8px;
    bottom: 4px;
    border-radius: 2px;
    font-size: 10px;
    height: 14px;
    width: 14px;
    line-height: 14px;
    text-align: center;
    color: white;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Helvetica Neue";
  }

  .CodeMirror-Tern-completion:after {
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
    font-family: monospace;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    position: relative;
    content: "";
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    flex: 1 1 0;
    padding-right: 8px;
    padding-left: 10px;
  }

  .CodeMirror-Tern-completion-unknown:before {
    content: "?";
    background: #4bb;
  }

  .CodeMirror-Tern-completion-object {
    &:before {
      content: "O";
      background: #ffefb7;
      color: #ffcd00;
    }

    &:after {
      content: "Object";
    }
  }

  .CodeMirror-Tern-completion-fn {
    &:before {
      content: "F";
      background: #e3fdff;
      color: #12ddf2;
    }

    &:after {
      content: "Function";
    }
  }

  .CodeMirror-Tern-completion-array {
    &:before {
      content: "A";
      background: #dbfff1;
      color: #00d689;
    }

    &:after {
      content: "Array";
    }
  }

  .CodeMirror-Tern-completion-number {
    &:before {
      content: "1";
      background: #ffe8da;
      color: #ff8246;
    }

    &:after {
      content: "Number";
    }
  }

  .CodeMirror-Tern-completion-string {
    :before {
      content: "S";
      background: #ffe4e4;
      color: #ff7272;
    }

    &:after {
      content: "String";
    }
  }

  .CodeMirror-Tern-completion-bool:before {
    content: "B";
    background: #999;
  }

  .CodeMirror-Tern-completion-guess {
    color: #999;
  }

  .CodeMirror-Tern-tooltip {
    margin: 0 8px;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    border-radius: 8px;
    color: #444;
    padding: 3px 8px 8px;
    font-size: 90%;
    font-family: monospace;
    background-color: white;
    white-space: pre-wrap;

    max-width: 40em;
    position: absolute;
    z-index: 10;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.16);

    transition: opacity 1s;
    -moz-transition: opacity 1s;
    -webkit-transition: opacity 1s;
    -o-transition: opacity 1s;
    -ms-transition: opacity 1s;
  }

  .CodeMirror-Tern-hint-doc {
    max-width: 25em;
    margin-top: -3px;
  }

  .CodeMirror-Tern-fname {
    color: black;
  }

  .CodeMirror-Tern-farg {
    color: #70a;
  }

  .CodeMirror-Tern-farg-current {
    text-decoration: underline;
  }

  .CodeMirror-Tern-type {
    color: #07c;
  }

  .CodeMirror-Tern-fhint-guess {
    opacity: 0.7;
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
      border-radius: ${inputState.borderRadius};
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
    border-radius: 0 0 8px 8px;
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
