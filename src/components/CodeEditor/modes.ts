import CodeMirror from "codemirror"
import "codemirror/addon/mode/multiplex"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/htmlmixed/htmlmixed"
import "codemirror/mode/xml/xml"
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
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})

CodeMirror.defineMode(EditorModes.SQL_JS, function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, { name: "text/x-mysql" }),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})

CodeMirror.defineMode(EditorModes.XML_JS, function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, { name: "application/xml" }),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})

CodeMirror.defineMode(EditorModes.HTML_JS, function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, { name: "text/html" }),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})
CodeMirror.defineMode(EditorModes.JAVASCRIPT, function (config) {
  return CodeMirror.multiplexingMode(
    CodeMirror.getMode(config, {
      name: "application/javascript",
    }),
    {
      open: "{{",
      close: "}}",
      mode: CodeMirror.getMode(config, {
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})
