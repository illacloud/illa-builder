import { FC, useEffect, useRef, useState } from "react"
import { CodeInputProps, EditorModes } from "./interface"
import { useCodeMirror } from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { sql } from "@codemirror/lang-sql"

export const CodeInput: FC<CodeInputProps> = (props) => {
  const {
    className,
    mode = "javascript",
    placeholder = "input sth",
    value,
    defaultValue,
    onBlur,
    onChange,
    ...otherProps
  } = props
  const editor = useRef<HTMLDivElement>(null)

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions: [javascript()],
  })

  useEffect(() => {
    // const editor = CodeMirror(editor.current!, {
    //   mode: EditorModes[mode],
    //   placeholder,
    //   lineNumbers: mode !== "TEXT_JS",
    //   autocapitalize: false,
    //   autofocus: false,
    //   matchBrackets: true,
    //   autoCloseBrackets: true,
    //   tabSize: 2,
    //   hintOptions: {
    //     completeSingle: false,
    //   },
    // })
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [editor.current])

  return <div className={className} ref={editor} {...otherProps}></div>
}

CodeInput.displayName = "CodeInput"
