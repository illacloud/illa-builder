import { useEffect, useRef } from "react"
import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
// import 'codemirror/theme/monokai.css'
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/sql/sql"

import "./cm-replace-style.css"

export function EditorInput() {
  const targetRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!targetRef.current) return
    if (targetRef.current.childNodes.length) return
    CodeMirror(targetRef.current, {
      mode: { name: "javascript", json: true },
      // theme: "monokai",
      extraKeys: { Ctrl: "autocomplete" },
      lineNumbers: true,
      autocapitalize: true,
      viewportMargin: Infinity,
    })
  }, [])

  return (
    <div ref={targetRef}>{/* <textarea ref={targetRef}></textarea> */}</div>
  )
}

EditorInput.displayName = "EditorInput"
