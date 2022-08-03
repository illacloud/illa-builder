import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { css, Global } from "@emotion/react"
import { debounce, get } from "lodash"
import CodeMirror, { Editor } from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/lib/codemirror"
import "codemirror/theme/duotone-light.css"
import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/display/placeholder"
import "codemirror/addon/display/autorefresh"
import "./modes"
import "./hinter"
import "./lintHelper"
import { BaseTern, TernServer } from "./TernSever"
import { Trigger } from "@illa-design/trigger"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { CodePreview } from "./CodePreview"
import { CodeEditorProps, EditorModes, ResultPreview } from "./interface"
import { applyCodeEditorStyle, codemirrorStyle } from "./style"
import { isCloseKey, isExpectType } from "./utils"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { useSelector } from "react-redux"
import { getLanguageValue } from "@/redux/builderInfo/builderInfoSelector"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { clearMarks, lineMarker } from "@/components/CodeEditor/lintHelper"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    className,
    mode = "TEXT_JS",
    placeholder,
    expectedType = VALIDATION_TYPES.STRING,
    borderRadius = "8px",
    path,
    tables = {},
    lineNumbers,
    noTab,
    value,
    height = "auto",
    readOnly,
    onBlur,
    maxHeight = "auto",
    onChange,
    ...otherProps
  } = props
  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)
  const languageValue = useSelector(getLanguageValue)
  const executionError = useSelector(getExecutionError)
  const executionResult = useSelector(getExecutionResult)
  const codeTargetRef = useRef<HTMLDivElement>(null)
  const sever = useRef<CodeMirror.TernServer>()
  const [editor, setEditor] = useState<Editor>()
  const [preview, setPreview] = useState<ResultPreview>({
    state: "default",
    type: expectedType,
  })
  const [previewVisible, setPreviewVisible] = useState<boolean>()
  const [focus, setFocus] = useState<boolean>()
  const [error, setError] = useState<boolean>()
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
    setError(false)
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
      setError(true)
      setPreview({
        state: "error",
        content: e.toString(),
      })
    } finally {
      latestProps.current.onChange?.(currentValue, calcResult)
    }
  }

  useEffect(() => {
    if (path) {
      const error = get(executionError, path)
      const result = get(executionResult, path)
      if (error) {
        const evalError = error?.find((item) => {
          return item.errorType !== "LINT"
        })
        const lintError = error?.find((item) => {
          return item.errorType === "LINT"
        })
        if (evalError) {
          setError(true)
          setPreview({
            state: "error",
            content: evalError.errorMessage,
          })
        }
        if (lintError?.errorLine && editor) {
          lineMarker(editor, lintError.errorLine - 1)
        }
      } else {
        setError(false)
        setPreview({
          state: "default",
          type: expectedType,
          content: result?.toString() ?? "",
        })
      }
    }
  }, [executionError, executionResult, path])

  const handleChange = (editor: Editor, change: CodeMirror.EditorChange) => {
    const currentValue = editor?.getValue()
    clearMarks(editor)
    if (path) {
      latestProps.current.onChange?.(currentValue)
    } else {
      valueChanged(currentValue)
    }
  }

  const debounceHandleChange = debounce(handleChange, 300)

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
    if (mode === "XML_JS" || mode === "HTML_JS") {
      showAutocomplete = true
    }
    if (key === "/") {
      showAutocomplete = true
    } else if (event.code === "Backspace") {
      const prevChar = line[cursor.ch - 1]
      showAutocomplete = !!prevChar && /[a-zA-Z_0-9.]/.test(prevChar)
    } else if (key === "{") {
      const prevChar = line[cursor.ch - 2]
      showAutocomplete = prevChar === "{"
    } else if (key.length == 1) {
      showAutocomplete = /[a-zA-Z_0-9.]/.test(key)
    }
    showAutocomplete && handleAutocomplete(editor, line)
  }

  useEffect(() => {
    const currentValue = editor?.getValue()
    if (value !== currentValue) {
      editor?.setValue(value ?? "")
    }
  }, [value])

  const handleAutocomplete = (cm: CodeMirror.Editor, line: string) => {
    const modeName = cm.getModeAt(cm.getCursor()).name
    // @ts-ignore: type define error
    const modeHelperType = cm.getModeAt(cm.getCursor())?.helperType
    if (modeName == "sql") {
      CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        tables,
        completeSingle: false,
      })
    } else if (modeHelperType == "xml") {
      CodeMirror.showHint(cm, CodeMirror.hint.xml, {
        completeSingle: false,
      })
    } else if (modeHelperType == "html") {
      CodeMirror.showHint(cm, CodeMirror.hint.html, {
        completeSingle: false,
      })
    } else if (modeHelperType == "json") {
      sever.current?.complete(cm)
    } else if (modeName == "javascript") {
      BaseTern?.complete(cm)
    }
  }

  useEffect(() => {
    sever.current = TernServer(languageValue, { ...executionResult })
  }, [executionResult, languageValue])

  useEffect(() => {
    editor?.setOption("mode", EditorModes[mode])
  }, [mode])

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
        lineWrapping: true,
        scrollbarStyle: "null",
        tabSize: 2,
        value: value ?? "",
        readOnly: readOnly && "nocursor",
        hintOptions: {
          completeSingle: false,
        },
      })
      if (noTab) {
        editor?.setOption("extraKeys", { Tab: false })
      }
      if (lineNumbers) {
        editor?.setOption("gutters", ["CodeMirror-lint-markers"])
      }
      editor.on("change", debounceHandleChange)
      editor.on("keyup", handleKeyUp)
      editor.on("focus", handleFocus)
      editor.on("blur", handleBlur)
      setEditor(editor)
    }

    return () => {
      editor?.off("change", debounceHandleChange)
      editor?.off("keyup", handleKeyUp)
      editor?.off("focus", handleFocus)
      editor?.off("blur", handleBlur)
    }
  }, [])

  const inputState = {
    focus,
    error,
    height,
    borderRadius,
    maxHeight,
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
        openDelay={10}
        closeDelay={10}
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
            className={error ? "cm-error" : "cm-default"}
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
