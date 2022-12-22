import { defineMode, getMode, multiplexingMode } from "codemirror"
import "codemirror/addon/hint/javascript-hint"
import "codemirror/addon/hint/show-hint"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/sql-hint"
import "codemirror/addon/mode/multiplex"
import "codemirror/mode/htmlmixed/htmlmixed"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/sql/sql"
import "codemirror/mode/xml/xml"
import { EditorModes } from "./interface"

defineMode(EditorModes.Postgre_SQL_JS, function (config) {
  return multiplexingMode(getMode(config, { name: "text/x-pgsql" }), {
    open: "{{",
    close: "}}",
    mode: getMode(config, {
      name: "application/json",
    }),
    delimStyle: "illa-expression",
    innerStyle: "illa-expression",
    parseDelimiters: false,
  })
})

defineMode(EditorModes.GRAPHQL, function (config) {
  return multiplexingMode(getMode(config, { name: "application/graphql" }), {
    open: "{{",
    close: "}}",
    mode: getMode(config, {
      name: "application/json",
    }),
    delimStyle: "illa-expression",
    innerStyle: "illa-expression",
    parseDelimiters: false,
  })
})

defineMode(EditorModes.TEXT_JS, function (config) {
  return multiplexingMode(getMode(config, EditorModes.TEXT), {
    open: "{{",
    close: "}}",
    mode: getMode(config, {
      name: "application/json",
    }),
    delimStyle: "illa-expression",
    innerStyle: "illa-expression",
    parseDelimiters: false,
  })
})

defineMode(EditorModes.SQL_JS, function (config) {
  return multiplexingMode(getMode(config, { name: "text/x-mysql" }), {
    open: "{{",
    close: "}}",
    mode: getMode(config, {
      name: "application/json",
    }),
    delimStyle: "illa-expression",
    innerStyle: "illa-expression",
    parseDelimiters: false,
  })
})

defineMode(EditorModes.XML_JS, function (config) {
  return multiplexingMode(getMode(config, { name: "application/xml" }), {
    open: "{{",
    close: "}}",
    mode: getMode(config, {
      name: "application/json",
    }),
    delimStyle: "illa-expression",
    innerStyle: "illa-expression",
    parseDelimiters: false,
  })
})

defineMode(EditorModes.HTML_JS, function (config) {
  return multiplexingMode(getMode(config, { name: "text/html" }), {
    open: "{{",
    close: "}}",
    mode: getMode(config, {
      name: "application/json",
    }),
    delimStyle: "illa-expression",
    innerStyle: "illa-expression",
    parseDelimiters: false,
  })
})
defineMode(EditorModes.JAVASCRIPT, function (config) {
  return multiplexingMode(
    getMode(config, {
      name: "application/javascript",
    }),
    {
      open: "{{",
      close: "}}",
      mode: getMode(config, {
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})

defineMode(EditorModes.JSON, function (config) {
  return multiplexingMode(
    getMode(config, {
      name: "application/json",
      json: true,
      jsonld: true,
    }),
    {
      open: "{{",
      close: "}}",
      mode: getMode(config, {
        name: "application/json",
      }),
      delimStyle: "illa-expression",
      innerStyle: "illa-expression",
      parseDelimiters: false,
    },
  )
})
