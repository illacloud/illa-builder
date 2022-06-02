import { FC, useEffect, useMemo, useRef, useState } from "react"
import { CodeEditorProps, EditorModes } from "./interface"

import CodeMirror, { Editor } from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/duotone-dark.css"
import "codemirror/theme/duotone-light.css"
import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/display/placeholder"
// defineMode
import "./modes"

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    className,
    mode = "TEXT_JS",
    placeholder = "input sth",
    value,
    defaultValue,
    onBlur,
    onChange,
    ...otherProps
  } = props
  const codeTargetRef = useRef<HTMLDivElement>(null)

  const handleBlur = (instance: Editor, event: FocusEvent) => {
    onBlur?.()
  }

  const handleChange = (editor: Editor, change: CodeMirror.EditorChange) => {
    // callback
    onChange?.(editor.getValue())
    // [TODO] autocomplete
  }

  useEffect(() => {
    const editor = CodeMirror(codeTargetRef.current!, {
      mode: EditorModes[mode],
      placeholder,
      lineNumbers: mode !== "TEXT_JS",
      autocapitalize: false,
      autofocus: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      tabSize: 2,
      hintOptions: {
        completeSingle: false,
        container: document.getElementById("hintBody"),
      },
    })

    editor.on("change", handleChange)
    editor.on("blur", handleBlur)

    return () => {
      editor.off("change", handleChange)
      editor.off("blur", handleBlur)
    }
  }, [])

  return (
    <div className={className} ref={codeTargetRef} {...otherProps}>
      <div id="hintBody" />
    </div>
  )
}

CodeEditor.displayName = "CodeEditor"
