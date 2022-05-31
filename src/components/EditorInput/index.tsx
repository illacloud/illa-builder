import { useEffect, useRef, forwardRef, ForwardedRef, useState } from "react"
import ReactDOM from "react-dom"
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

import { applyCMStyle } from "./style"

import { ACItem } from "./autoComplete/item"
import { HintComplement } from "./autoComplete/hintComplement"

// TODO
import "./modes"

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

    // const [triggerVisible, setTriggerVisible] = useState<boolean>(false)
    // const [triggerPosition, setTriggerPosition] = useState<customPositionType>()

    const [currentHintIndex, setCurrentHintIndex] = useState<number>(0)
    let testValue = 0

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
          // container: testContainer()
        },
        placeholder,
      })

      editor.on("change", handleChange)
      editor.on("blur", handleBlur)

      editor.on("beforeSelectionChange", (cm, obj) => {
        console.log(obj)
      })

      // editor.on("renderLine", (cm, handle, ele) => {
      //   console.log(cm)
      //   console.log(handle)
      //   console.log(ele)
      // })

      CodeMirror.registerHelper(
        "hint",
        "javascript",
        (editor: CodeMirror.Editor, hintOptions) => {
          console.log(hintOptions)
          const cursor = editor.getCursor()
          const line = editor.getLine(cursor.line)
          const end = cursor.ch
          const start = end
          if (`${line[cursor.ch - 2]}${line[cursor.ch - 1]}` === "{{") {
            const hint = {
              // list: [{
              //   text: 'custom-hint',
              //   displayText: "你好呀",
              //   displayInfo: "提示信息1",
              //   render: renderCustomHint
              // }],
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

    useEffect(() => {
      console.log(currentHintIndex)
    }, [currentHintIndex])

    const changeCurrentHintIndex = (change: 1 | -1) => {
      // setCurrentHintIndex(currentHintIndex + change)
      // setCurrentHintIndex(currentHintIndex + 1)
      // console.log(currentHintIndex + change)
      // setCurrentHintIndex(currentHintIndex + change)
      testValue = testValue + change
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
      // ReactDOM.render(<ACItem type={data.type} content={data.text} />, div)
      ReactDOM.render(
        <HintComplement
          ele={<ACItem type={data.type} content={data.text} />}
          // index={currentHintIndex}
          index={testValue}
        />,
        div,
      )
      // console.log(element)
      // console.log(self)
      // console.log(data)
      element.appendChild(div)
    }

    // const ignoreStr = " ,#,!,-,=,@,$,%,&,+,;,(,),*,(),{}"
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
      // const cursor = editor.getCursor()
      // const line = editor.getLine(cursor.line)
      // if (`${line[cursor.ch - 2]}${line[cursor.ch - 1]}` === "{{") {
      //   setTriggerVisible(true)
      //   const cursorPosition = editor.cursorCoords(true, "page")
      //   setTriggerPosition({
      //     x: cursorPosition.left - editor.defaultCharWidth(),
      //     y: cursorPosition.top + editor.defaultTextHeight()
      //   })
      // }
    }

    const handleBlur = () => {
      onBlur?.()
    }

    // const tryUpdatePopupVisible = (value: boolean) => {
    //   if (triggerVisible !== value && !value) {
    //     setTriggerVisible(value)
    //   }
    // }

    return (
      // <Trigger
      //   trigger="click"
      //   position="bl"
      //   colorScheme="white"
      //   showArrow={false}
      //   closeOnClick={false}
      //   clickOutsideToClose
      //   popupVisible={triggerVisible}
      //   onVisibleChange={tryUpdatePopupVisible}
      //   content={<ACList />}
      //   customPosition={triggerPosition}
      // >
      //   <div ref={ref}>
      //     <div ref={cmRef} css={css(applyCMStyle(height), _css)} />
      //   </div>
      // </Trigger>
      <div ref={cmRef} css={css(applyCMStyle(height), _css)} />
    )
  },
)

EditorInput.displayName = "EditorInput"
