import { JSHINT } from "jshint"
import "codemirror/addon/lint/lint"
import "codemirror/addon/lint/javascript-lint"
import "codemirror/addon/lint/lint.css"

// @ts-ignore: create global variable
// see in: https://github.com/codemirror/codemirror5/issues/5362
window.JSHINT = JSHINT

// CodeMirror.lint.javascript(cm.getValue(), {}, cm)
