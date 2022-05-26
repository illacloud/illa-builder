import { useEffect, useRef, forwardRef, ForwardedRef, useState } from "react"
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

import { Trigger } from "@illa-design/trigger"

// TODO
// import "./modes"

export const EditorInput = forwardRef<HTMLDivElement, EditorInputProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      _css,
      mode,
      lineNumbers = true,
      height = "auto",
      placeholder = "input sth",
      onChange,
      onBlur,
    } = props

    const [triggerVisible, setTriggerVisible] = useState<boolean>(false)

    const cmRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const editor = CodeMirror(cmRef.current!, {
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

      editor.on("change", handleChange)
      editor.on("blur", handleblur)
    }, [])

    const ignoreStr = " ,#,!,-,=,@,$,%,&,+,;,(,),*,(),{}"
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
    const handleChange = (
      editor: CodeMirror.Editor,
      change: CodeMirror.EditorChange,
    ) => {
      // callback
      onChange?.(editor.getValue())
      // autocomplete
      if (change.origin == "+input") {
        let text = change.text
        // no hint
        if (!ignoreToken(text)) {
          setTimeout(function () {
            editor.execCommand("autocomplete")
          }, 20)
        }
      }
      // {{ }}
      const cursor = editor.getCursor()
      const line = editor.getLine(cursor.line)
      if (`${line[cursor.ch - 2]}${line[cursor.ch - 1]}` === "{{") {
        setTriggerVisible(true)
      }
    }

    const handleblur = () => {
      onBlur?.()
    }

    const tryUpdatePopupVisible = (value: boolean) => {
      if (triggerVisible !== value && !value) {
        setTriggerVisible(value)
      }
    }

    return (
      <Trigger
        trigger="click"
        position="br"
        colorScheme="white"
        showArrow={false}
        autoAlignPopupWidth
        closeOnClick={false}
        clickOutsideToClose
        popupVisible={triggerVisible}
        onVisibleChange={tryUpdatePopupVisible}
        content={<div>123</div>}
      >
        <div ref={ref}>
          <div ref={cmRef} css={css(applyCMCss(height), _css)} />
        </div>
      </Trigger>
    )
  },
)

EditorInput.displayName = "EditorInput"
