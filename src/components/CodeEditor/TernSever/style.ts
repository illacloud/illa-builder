import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import arraySvg from "./assets/array.svg"
import booleanSvg from "./assets/boolean.svg"
import stringSvg from "./assets/string.svg"
import objectSvg from "./assets/object.svg"
import numberSvg from "./assets/number.svg"
import nullSvg from "./assets/null.svg"
import functionSvg from "./assets/function.svg"

export const ternStyle = css`
  .CodeMirror-Tern-completion {
    display: flex;
    align-items: center;
    padding-left: 30px;
    position: relative;
    height: 24px;
  }

  .CodeMirror-Tern-completion:before {
    content: "";
    position: absolute;
    left: 8px;
    bottom: 5px;
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
    font-weight: 400;
    font-size: 12px;
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
    background: url(${nullSvg});
  }

  .CodeMirror-Tern-completion-object {
    &:before {
      background: url(${objectSvg});
    }

    &:after {
      content: "Object";
    }
  }

  .CodeMirror-Tern-completion-fn {
    &:before {
      background: url(${functionSvg});
    }

    &:after {
      content: "Function";
    }
  }

  .CodeMirror-Tern-completion-array {
    &:before {
      background: url(${arraySvg});
    }

    &:after {
      content: "Array";
    }
  }

  .CodeMirror-Tern-completion-number {
    &:before {
      background: url(${numberSvg});
    }

    &:after {
      content: "Number";
    }
  }

  .CodeMirror-Tern-completion-string {
    :before {
      background: url(${stringSvg});
    }

    &:after {
      content: "String";
    }
  }

  .CodeMirror-Tern-completion-bool {
    :before {
      background: url(${booleanSvg});
    }

    &:after {
      content: "Boolean";
    }
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
    font-family: "Fira Code", monospace;
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
    width: 287px;
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
