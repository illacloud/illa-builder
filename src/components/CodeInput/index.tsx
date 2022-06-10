import { FC, useEffect, useRef } from "react"
import { CodeInputProps, EditorModes } from "./interface"
import { useCodeMirror } from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { sql } from "@codemirror/lang-sql"
import { ViewUpdate } from "@codemirror/view"

const getModeExtension = (mode: CodeInputProps["mode"]) => {
  switch (mode) {
    case "javascript":
      return [javascript()]
    case "text-js":
      return [javascript()]
    case "sql":
      return [sql()]
    case "sql-js":
      return [sql()]
    default:
      return []
  }
}

export const CodeInput: FC<CodeInputProps> = (props) => {
  const {
    className,
    mode = "javascript",
    placeholder = "input sth",
    value,
    defaultValue,
    readOnly,
    height = "",
    onBlur,
    onChange,
    ...otherProps
  } = props

  const editor = useRef<HTMLDivElement>(null)

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    onChange?.(value)
  }

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions: [...getModeExtension(mode)],
    value: "",
    placeholder,
    readOnly,
    height,
    onChange: handleChange,
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [editor.current])

  return <div className={className} ref={editor}></div>
}

CodeInput.displayName = "CodeInput"
