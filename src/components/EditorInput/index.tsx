import { useEffect, useRef, forwardRef, useState } from "react"
import ReactDOM from "react-dom"

import { Trigger } from "@illa-design/trigger"

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

import { applyCMStyle, applyHintBodyStyle, hintBodyTriggerStyle } from "./style"

import { AutoCompleteItem } from "./AutoComplete/item"
import { HintComplement } from "./AutoComplete/HintComplement"

import { EditorInputProps, HintBodyParamsProps } from "./interface"

import "./modes"

export const EditorInput = forwardRef<HTMLDivElement, EditorInputProps>(
  (props, ref) => {
    const {
      className,
      mode,
      lineNumbers = true,
      height = "auto",
      placeholder = "input sth",
      cmValue = "",
      readOnly,
      onChange,
      onBlur,
      ...otherProps
    } = props

    const [hintBodyParams, setHintBodyParams] = useState<HintBodyParamsProps>({
      show: false,
      top: 0,
      left: 0,
    })
    const [showHintTrigger, setShowHintTrigger] = useState<boolean>(false)

    const [currentHintIndex, setCurrentHintIndex] = useState<number>(0)

    const cmRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const editor = CodeMirror(cmRef.current!, {
        value: cmValue,
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
          extraKeys: {
            Up: (cm: CodeMirror.Editor, handle: any) => {
              handle.moveFocus(-1)
              changeCurrentHintIndex(-1)
              // if (this.active.isHeader === true) {
              //   handle.moveFocus(-1);
              // }
            },
            Down: (cm: CodeMirror.Editor, handle: any) => {
              handle.moveFocus(1)
              changeCurrentHintIndex(1)
              // if (this.active.isHeader === true) {
              //   handle.moveFocus(1);
              // }
            },
          },
          container: document.getElementById("hintBody"),
        },
        placeholder,
        readOnly: readOnly && "nocursor",
      })

      editor.on("change", handleChange)
      editor.on("blur", handleBlur)

      CodeMirror.registerHelper(
        "hint",
        "javascript",
        (editor: CodeMirror.Editor) => {
          // console.log(hintOptions)
          const cursor = editor.getCursor()
          const line = editor.getLine(cursor.line)
          const end = cursor.ch
          const start = end
          if (`${line[cursor.ch - 2]}${line[cursor.ch - 1]}` === "{{") {
            const hint = {
              list: listHintData(),
              from: CodeMirror.Pos(cursor.line, start),
              to: CodeMirror.Pos(cursor.line, end),
            }
            // CodeMirror.on(hint, "pick", (selected) => {
            //   console.log("selected", selected)
            // })
            return hint
          }
        },
      )

      return () => {
        editor.off("change", handleChange)
        editor.off("blur", handleBlur)
      }
    }, [])

    const changeCurrentHintIndex = (change: 1 | -1) => {
      setCurrentHintIndex((currentHintIndex) => currentHintIndex + change)
    }

    const listHintData = () => {
      return [
        {
          text: "aaa",
          type: "String",
          index: 0,
          render: renderCustomHint,
        },
        {
          text: "bbb",
          type: "Number",
          index: 1,
          render: renderCustomHint,
        },
      ]
    }

    const renderCustomHint = (element: HTMLElement, self: any, data: any) => {
      let div = document.createElement("div")
      ReactDOM.render(
        <AutoCompleteItem type={data.type} content={data.text} />,
        div,
      )
      element.appendChild(div)
    }

    const ignoreStr = " ,#,!,-,=,@,$,%,&,+,;,(,),*,()"
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
        const cursorPosition = editor.cursorCoords(true, "page")
        setHintBodyParams({
          show: true,
          top: cursorPosition.top + editor.defaultTextHeight(),
          left: cursorPosition.left - editor.defaultCharWidth(),
        })
        setShowHintTrigger(true)
      }
    }

    const handleBlur = () => {
      onBlur?.()
      setShowHintTrigger(false)
    }

    return (
      <>
        <div ref={cmRef} css={applyCMStyle(height)} className={className} />
        <Trigger
          _css={hintBodyTriggerStyle}
          trigger="hover"
          position="right"
          colorScheme="white"
          showArrow={false}
          content={<HintComplement index={currentHintIndex} />}
          popupVisible={showHintTrigger}
        >
          <div id="hintBody" css={applyHintBodyStyle(hintBodyParams)} />
        </Trigger>
      </>
    )
  },
)

EditorInput.displayName = "EditorInput"
