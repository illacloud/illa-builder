import { forwardRef, useEffect, useRef, useState, useCallback } from "react"
import { Global } from "@emotion/react"
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
import { clearMarks, lineMarker } from "@/components/CodeEditor/lintHelper"
import { BaseTern, TernServer } from "./TernSever"
import { Trigger } from "@illa-design/trigger"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { CodePreview } from "./CodePreview"
import { CodeEditorProps, EditorModes, ResultPreview } from "./interface"
import { applyCodeEditorStyle, codemirrorStyle } from "./style"
import { getValueType, isCloseKey, isExpectType } from "./utils"
import { useSelector } from "react-redux"
import { getLanguageValue } from "@/redux/builderInfo/builderInfoSelector"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"

export const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
  (props, ref) => {
    const {
      className,
      mode = "TEXT_JS",
      placeholder,
      border,
      expectedType,
      borderRadius = "8px",
      path,
      tables = {},
      extendedData = {},
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
    const languageValue = useSelector(getLanguageValue)
    const executionError = useSelector(getExecutionError)
    const executionResult = useSelector(getExecutionResult)
    const executionResultRef = useRef<Record<string, any>>(executionResult)
    const codeTargetRef = useRef<HTMLDivElement>(null)
    const sever = useRef<CodeMirror.TernServer>()
    const ILLAEditor = useRef<Editor | null>(null)
    const [preview, setPreview] = useState<ResultPreview>({
      state: "default",
      type: expectedType,
    })
    const [previewVisible, setPreviewVisible] = useState<boolean>()
    const [focus, setFocus] = useState<boolean>()
    const [error, setError] = useState<boolean>(false)
    // Solve the closure problem
    const latestProps = useRef(props)
    latestProps.current = props

    const handleFocus = () => {
      setFocus(true)
    }

    const handleBlur = () => {
      latestProps.current?.onBlur?.()
      setFocus(false)
      setPreviewVisible(false)
    }

    const valueChanged = useCallback(
      (currentValue: string) => {
        let calcResult: any = null
        let previewType: string = expectedType
        setError(false)
        try {
          const isDynamic = isDynamicString(currentValue)
          if (isDynamic) {
            calcResult = evaluateDynamicString(
              "",
              currentValue,
              executionResultRef.current || {},
            )
          } else {
            calcResult = currentValue
          }
          previewType = getValueType(calcResult)

          // [TODO]: v1 evaluate
          // if (!currentValue?.includes("{{")) {
          //   calcResult = getEvalValue(previewType, calcResult)
          // }
          calcResult && isExpectType(previewType, calcResult)

          setPreview({
            state: "default",
            type: previewType,
            content: calcResult,
          })
        } catch (e) {
          setError(true)
          if (e instanceof Error) {
            setPreview({
              state: "error",
              content: e.toString(),
            })
          }
        } finally {
          latestProps.current.onChange?.(currentValue, calcResult)
        }
      },
      [expectedType],
    )

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
          if (lintError?.errorLine && ILLAEditor.current) {
            lineMarker(ILLAEditor.current, lintError.errorLine - 1)
          }
        } else {
          const type = props.expectedType ?? getValueType(result)
          setError(false)
          setPreview({
            state: "default",
            type: type,
            content: result?.toString() ?? "",
          })
        }
      }
    }, [executionError, executionResult, expectedType, path])

    useEffect(() => {
      if (!path && previewVisible) {
        valueChanged(value || "")
      }
    }, [valueChanged, value, path, previewVisible])

    const handleChange = (editor: Editor) => {
      const currentValue = editor?.getValue()
      clearMarks(editor)
      if (path) {
        latestProps.current.onChange?.(currentValue)
      } else {
        valueChanged(currentValue)
      }
    }

    const debounceHandleChange = debounce(handleChange, 300)

    const handleKeyUp = useCallback(
      (editor: Editor, event: KeyboardEvent) => {
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
      },
      [mode],
    )

    useEffect(() => {
      const currentValue = ILLAEditor.current?.getValue()
      if (value !== currentValue) {
        ILLAEditor.current?.setValue(value ?? "")
      }
    }, [value])

    const handleAutocomplete = (cm: CodeMirror.Editor, line: string) => {
      const modeName = cm.getModeAt(cm.getCursor()).name
      // @ts-ignore: type define error
      const modeHelperType = cm.getModeAt(cm.getCursor())?.helperType
      if (modeName == "sql") {
        CodeMirror.showHint(cm, CodeMirror.hint.sql, {
          tables: latestProps.current?.tables,
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
      executionResultRef.current = executionResult
    }, [executionResult])

    useEffect(() => {
      sever.current = TernServer(languageValue, {
        ...executionResult,
        ...extendedData,
      })
    }, [executionResult, languageValue, extendedData])

    useEffect(() => {
      ILLAEditor.current?.setOption("mode", EditorModes[mode])
    }, [mode])

    useEffect(() => {
      if (!ILLAEditor.current) {
        ILLAEditor.current = CodeMirror(codeTargetRef.current!, {
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
          ILLAEditor.current?.setOption("extraKeys", { Tab: false })
        }
        if (lineNumbers) {
          ILLAEditor.current?.setOption("gutters", ["CodeMirror-lint-markers"])
        }
        ILLAEditor.current.on("change", debounceHandleChange)
        ILLAEditor.current.on("keyup", handleKeyUp)
        ILLAEditor.current.on("focus", handleFocus)
        ILLAEditor.current.on("blur", handleBlur)
      }
    }, [
      debounceHandleChange,
      handleKeyUp,
      lineNumbers,
      mode,
      noTab,
      placeholder,
      readOnly,
      value,
    ])

    useEffect(() => {
      return () => {
        ILLAEditor.current?.off("change", debounceHandleChange)
        ILLAEditor.current?.off("keyup", handleKeyUp)
        ILLAEditor.current?.off("focus", handleFocus)
        ILLAEditor.current?.off("blur", handleBlur)
        ILLAEditor.current = null
      }
    }, [])

    const inputState = {
      focus,
      error,
      height,
      border,
      borderRadius,
      maxHeight,
    }

    return (
      <>
        <Global styles={codemirrorStyle} />
        <Trigger
          withoutOffset
          trigger="focus"
          position="bottom-start"
          autoAlignPopupWidth
          withoutPadding
          withoutShadow
          openDelay={10}
          closeDelay={10}
          maxW="none"
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
          <div className={className} ref={ref}>
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
  },
)

CodeEditor.displayName = "CodeEditor"
