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

  const handleAutocompleteKeyup = (cm: CodeMirror.Editor, event: KeyboardEvent) => {
    console.log(cm, event)
    const key = event.key;
    // if (isModifierKey(key)) return;
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    let showAutocomplete = false;
    /* Check if the character before cursor is completable to show autocomplete which backspacing */
    if (key === "/") {
      showAutocomplete = true;
    } else if (event.code === "Backspace") {
      const prevChar = line[cursor.ch - 1];
      showAutocomplete = !!prevChar && /[a-zA-Z_0-9.]/.test(prevChar);
    } else if (key === "{") {
      /* Autocomplete for { should show up only when a user attempts to write {{}} and not a code block. */
      const prevChar = line[cursor.ch - 2];
      showAutocomplete = prevChar === "{";
    } else if (key.length == 1) {
      showAutocomplete = /[a-zA-Z_0-9.]/.test(key);
      /* Autocomplete should be triggered only for characters that make up valid variable names */
    }
    // showAutocomplete && this.handleAutocompleteVisibility(cm);
  };




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
      // hintOptions: {
      //   completeSingle: false,
      //   container: document.getElementById("hintBody"),
      // },
    })

    editor.on("change", handleChange)
    editor.on("blur", handleBlur)
    editor.on("keyup", handleAutocompleteKeyup)

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
