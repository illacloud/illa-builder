import CodeMirror from "codemirror"
import "codemirror/addon/mode/multiplex"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/sql/sql"
import "codemirror/addon/hint/show-hint"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/sql-hint"
import "codemirror/addon/hint/javascript-hint"

import { EditorModes } from "./interface"

CodeMirror.defineMode(EditorModes.TEXT_JS, function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, EditorModes.TEXT),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "javascript",
      }),
    },
  )
})

CodeMirror.defineMode(EditorModes.SQL_JS, function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, EditorModes.SQL),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "javascript",
      }),
    },
  )
})
