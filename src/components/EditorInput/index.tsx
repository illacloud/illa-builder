import { FC, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { EditorInputProps } from "./interface"

import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
// import 'codemirror/theme/monokai.css'
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/sql/sql"

import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/javascript-hint.js"
import "codemirror/addon/hint/sql-hint.js"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/display/placeholder"

import { applyCMCss } from "./style"

export const EditorInput: FC<EditorInputProps> = (props) => {
  const {
    _css,
    mode,
    lineNumbers = true,
    height = "auto",
    placeholder = "input sth",
    onChange,
    onBlur,
  } = props

  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = CodeMirror(targetRef.current!, {
      mode: mode,
      lineNumbers: lineNumbers,
      autocapitalize: false,
      autofocus: false,
      matchBrackets: true,
      // viewportMargin: Infinity,
      tabSize: 2,
      autoCloseBrackets: true,
      hintOptions: {
        completeSingle: false,
      },
      extraKeys: { "Shift+Q": "autocomplete" },
      placeholder,
    })

    const ignoreStr = ",#,!,-,=,@,$,%,&,+,;,(,),*"
    const ignoreToken = (text?: string[]) => {
      const ignore = ignoreStr.split(",")
      if (text && text[0]) {
        for (const pre in ignore) {
          if (ignore[pre] === text[0]) {
            return true
          }
        }
      } else {
        return true
      }
      return false
    }

    editor.on("change", function (editor, change) {
      onChange?.(editor.getValue())
      // autocomplete
      if (change.origin == "+input") {
        var text = change.text
        // no hint
        if (!ignoreToken(text)) {
          setTimeout(function () {
            editor.execCommand("autocomplete")
          }, 20)
        }
      }
    })
    editor.on("blur", function () {
      onBlur?.()
    })
  }, [])

  return <div ref={targetRef} css={css(applyCMCss(height), _css)} />
}

EditorInput.displayName = "EditorInput"
