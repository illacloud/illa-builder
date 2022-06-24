import { FC, useContext, useEffect, useRef, useState } from "react"
import { css, Global } from "@emotion/react"
import CodeMirror, { Editor } from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/lib/codemirror"
import "codemirror/theme/duotone-light.css"
import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/display/placeholder"
import "codemirror/addon/display/autorefresh"
import "codemirror/addon/lint/lint"
import "codemirror/addon/lint/javascript-lint"
import "codemirror/addon/lint/lint.css"
// defineMode
import "./modes"
import "./hinter"
import { TernServer } from "./TernSever"
import { Trigger } from "@illa-design/trigger"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { CodePreview } from "./CodePreview"
import {
  ResultPreview,
  CodeEditorProps,
  EditorModes,
} from "./interface"
import { applyCodeEditorStyle, codemirrorStyle } from "./style"
import { isCloseKey, isExpectType } from "./utils"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { useSelector } from "react-redux"
import { getLanguageValue } from "@/redux/builderInfo/builderInfoSelector"
import { UpdateLintingCallback } from "codemirror/addon/lint/lint"
import {EvaluationError, getLintAnnotations} from "@/components/CodeEditor/lintHelper";
import { get } from "react-hook-form"
import { JSHINT } from "jshint";
window.JSHINT = JSHINT
export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    className,
    mode = "TEXT_JS",
    placeholder = "input sth",
    expectedType = "String",
    borderRadius = "8px",
    tables = {},
    lineNumbers,
    value,
    height = "auto",
    readOnly,
    onBlur,
    onChange,
    ...otherProps
  } = props
  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)
  const languageValue = useSelector(getLanguageValue)
  const codeTargetRef = useRef<HTMLDivElement>(null)
  const sever = useRef<CodeMirror.TernServer>()
  const [editor, setEditor] = useState<Editor>()
  const [preview, setPreview] = useState<ResultPreview>({
    state: "default",
    type: expectedType,
  })
  const [previewVisible, setPreviewVisible] = useState<boolean>()
  const [focus, setFocus] = useState<boolean>()
  const [updateLintingCallback, setLintingCallback] = useState<UpdateLintingCallback>()
  // Solve the closure problem
  const latestProps = useRef(props)
  latestProps.current = props

  const handleFocus = () => {
    setFocus(true)
  }

  const handleBlur = (instance: Editor, event: FocusEvent) => {
    latestProps.current?.onBlur?.()
    setFocus(false)
    setPreviewVisible(false)
  }

  const valueChanged = (currentValue: string) => {
    let calcResult: any = null
    let previewType = expectedType
    try {
      calcResult = evaluateDynamicString("", currentValue, globalData)
      // [TODO]: v1 evaluate
      // if (!currentValue?.includes("{{")) {
      //   calcResult = getEvalValue(previewType, calcResult)
      // }
      isExpectType(previewType, calcResult)
      setPreview({
        state: "default",
        type: previewType,
        content: calcResult,
      })
    } catch (e: any) {
      console.error(e)
      setPreview({
        state: "error",
        content: e.toString(),
      })
    } finally {
      latestProps.current.onChange?.(currentValue, calcResult)
    }
  }

  const handleChange = (editor: Editor, change: CodeMirror.EditorChange) => {
    const currentValue = editor?.getValue()
    valueChanged(currentValue)
  }

  const handleKeyUp = (editor: Editor, event: KeyboardEvent) => {
    const key = event.key
    const code = `${event.ctrlKey ? "Ctrl+" : ""}${event.code}`
    if (isCloseKey(code) || isCloseKey(key)) {
      editor.closeHint()
      return
    }
    const cursor = editor.getCursor()
    const line = editor.getLine(cursor.line)
    let showAutocomplete = false
    /* Check if the character before cursor is completable to show autocomplete which backspacing */
    if (event.code === "Backspace") {
      const prevChar = line[cursor.ch - 1]
      showAutocomplete = !!prevChar && /[a-zA-Z_0-9.]/.test(prevChar)
    } else if (key === "{") {
      /* Autocomplete for { should show up only when a user attempts to write {{}} and not a code block. */
      const prevChar = line[cursor.ch - 2]
      showAutocomplete = prevChar === "{"
    } else if (key.length == 1) {
      showAutocomplete = /[a-zA-Z_0-9.]/.test(key)
      /* Autocomplete should be triggered only for characters that make up valid variable names */
    }
    showAutocomplete && handleAutocomplete(editor)
  }

  useEffect(() => {
    const currentValue = editor?.getValue()
    if (value && value !== currentValue) {
      editor?.setValue(value)
    }
  }, [value])

  const handleAutocomplete = (cm: CodeMirror.Editor) => {
    const modeName = cm.getModeAt(cm.getCursor()).name
    if (modeName == "sql") {
      CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        tables,
        completeSingle: false,
      })
    } else if (modeName == "javascript") {
      sever.current?.complete(cm)
      CodeMirror.lint.javascript(cm.getValue(), {}, cm)
      // cm.showHint({
      //   hint: CodeMirror.hint.javascript,
      //   completeSingle: false, // 是否立即补全
      // })
    }
  }

  useEffect(() => {
    sever.current = TernServer(languageValue, globalData)
  }, [globalData, languageValue])

  useEffect(() => {
    if (!editor) {
      const editor = CodeMirror(codeTargetRef.current!, {
        mode: EditorModes[mode],
        placeholder,
        lineNumbers,
        autocapitalize: false,
        autofocus: false,
        matchBrackets: true,
        autoCloseBrackets: true,
        showCursorWhenSelecting: true,
        lineWrapping: true,
        scrollbarStyle: "null",
        tabSize: 2,
        value: value ?? "",
        readOnly: readOnly && "nocursor",
        hintOptions: {
          completeSingle: false,
        },
        lint: true,
      })

      editor.on("change", handleChange)
      editor.on("keyup", handleKeyUp)
      editor.on("focus", handleFocus)
      editor.on("blur", handleBlur)
      setEditor(editor)
    }

    return () => {
      editor?.off("change", handleChange)
      editor?.off("keyup", handleKeyUp)
      editor?.off("focus", handleFocus)
      editor?.off("blur", handleBlur)
    }
  }, [])

  const inputState = {
    focus,
    error: false,
    height,
    borderRadius,
  }

  return (
    <>
      <Global styles={codemirrorStyle} />
      <Trigger
        _css={css`
          padding: 0;
        `}
        trigger={"focus"}
        position="bl"
        autoAlignPopupWidth
        withoutPadding
        withoutShadow
        popupVisible={previewVisible}
        content={<CodePreview preview={preview} />}
        showArrow={false}
        colorScheme="white"
        onVisibleChange={(visible) => {
          if (visible !== previewVisible && focus) {
            setPreviewVisible(true)
          }
        }}
      >
        <div className={className}>
          <div
            ref={codeTargetRef}
            css={applyCodeEditorStyle(inputState)}
            {...otherProps}
          >
            <div id="hintBody" />
          </div>
        </div>
      </Trigger>
    </>
  )
}

CodeEditor.displayName = "CodeEditor"
