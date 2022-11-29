import { Editor } from "codemirror"
import "codemirror/addon/lint/javascript-lint"
import "codemirror/addon/lint/lint"
import "codemirror/addon/lint/lint.css"
import { JSHINT } from "jshint"
import { render } from "react-dom"

// @ts-ignore: create global variable
// see in: https://github.com/codemirror/codemirror5/issues/5362
window.JSHINT = JSHINT

// CodeMirror.lint.javascript(cm.getValue(), {}, cm)
const GUTTER_ID = "CodeMirror-lint-markers"

export const lineMarker = (cm: Editor, line: number) => {
  cm.clearGutter(GUTTER_ID)
  const div = document.createElement("div")
  render(
    <div className={"CodeMirror-lint-marker CodeMirror-lint-marker-error"} />,
    div,
  )
  cm.setGutterMarker(line, GUTTER_ID, div)
}

export const clearMarks = (cm?: Editor) => {
  if (!cm) return
  cm.clearGutter(GUTTER_ID)
}
