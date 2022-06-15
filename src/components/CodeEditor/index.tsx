import { FC, useEffect, useMemo, useRef, useState } from "react"
import { css, Global } from "@emotion/react"
import CodeMirror, { Editor } from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/duotone-light.css"
import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/display/placeholder"
import "codemirror/addon/display/autorefresh"
import "codemirror/addon/tern/tern.css"
import "codemirror/addon/lint/lint"
import "codemirror/addon/lint/lint.css"
// defineMode
import "./modes"
import {
  ResultPreview,
  CodeEditorProps,
  EditorModes,
  FieldEntityInformation,
} from "./interface"
import { applyCodeEditorStyle, codemirrorStyle } from "./style"
import { Trigger } from "@illa-design/trigger"
import { CodePreview } from "./CodePreview"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {getTypeValue, isExpectType} from "@/components/CodeEditor/utils"

export type Hinter = {
  showHint: (
    editor: CodeMirror.Editor,
    entityInformation: FieldEntityInformation,
    additionalData?: any,
  ) => boolean
  update?: (data: any) => void
  fireOnFocus?: boolean
}

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    className,
    mode = "TEXT_JS",
    placeholder = "input sth",
    expectedType = "String",
    value,
    height = "auto",
    onBlur,
    onChange,
    ...otherProps
  } = props
  const codeTargetRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<Editor>()
  const [hinters, setHinters] = useState<Hinter[]>([])
  const [hinterOpen, setHinterOpen] = useState<boolean>()
  const [preview, setPreview] = useState<ResultPreview>()
  const [previewVisible, setPreviewVisible] = useState<boolean>()

  const handleFocus = () => {
    console.log("foucs")
    setPreviewVisible(true)
  }

  const handleBlur = (instance: Editor, event: FocusEvent) => {
    onBlur?.()
    setPreviewVisible(false)
  }

  const handleChange = (editor: Editor, change: CodeMirror.EditorChange) => {
    handleAutocomplete(editor)
    try {
      const currentValue = editor?.getValue()
      let calcResult = evaluateDynamicString("", currentValue, {})
      console.log(
          expectedType,
          currentValue,
          calcResult,
          "evaluateData",
      )
      calcResult = getTypeValue(expectedType, calcResult)
      console.log(
          calcResult,
          "getTypeValue",
      )
      isExpectType(expectedType, calcResult)
      onChange?.(currentValue, calcResult)
      setPreview({
        state: "default",
        type: expectedType,
        content: calcResult.toString(),
      })
    } catch (e) {
      console.error(e)
      setPreview({
        state: "error",
        content: e.toString(),
      })
    }

  }

  useEffect(() => {
    const currentValue = editor?.getValue()
    if (value && value !== currentValue) {
      const calcResult = evaluateDynamicString("", value, {})
      editor?.setValue(value)
      onChange?.(value, calcResult)
      setPreview({
        state: "default",
        type: expectedType,
        content: calcResult,
      })
    }
  }, [value])

  const handleAutocompleteAddition= (cm: CodeMirror.Editor) => {
    // if (!isFocused) return;
    const entityInformation: FieldEntityInformation = {}
    let hinterOpen = false
    for (let i = 0; i < hinters.length; i++) {
      hinterOpen = hinters[i].showHint(cm, entityInformation, {})
      if (hinterOpen) break
    }
    setHinterOpen(hinterOpen)
  }

  const handleAutocomplete = (
    cm: CodeMirror.Editor,
  ) => {
    const modeName = cm.getModeAt(cm.getCursor()).name
    console.log(modeName, "modeName")
    if (modeName == "sql") {
      CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        // tables: {
        //   table1: ["col_A", "col_B", "col_C"],
        //   table2: ["other_columns1", "other_columns2"],
        // },
        completeSingle: false,
      })
    } else if (modeName == "javascript") {
      cm.showHint({
        hint: CodeMirror.hint.javascript,
        completeSingle: false, // 是否立即补全
      })
    }
  }

  const updateMarkings = (
    editor: CodeMirror.Editor,
    marking: Array<(editor: CodeMirror.Editor) => void>,
  ) => {
    marking.forEach((helper) => helper(editor))
  }

  useEffect(() => {
    console.log(editor, codeTargetRef, "editor")
    if (!editor) {
      const editor = CodeMirror(codeTargetRef.current!, {
        mode: EditorModes[mode],
        placeholder,
        lineNumbers: mode !== "TEXT_JS",
        autocapitalize: false,
        autofocus: false,
        matchBrackets: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        tabSize: 2,
        value: value ?? "",
        hintOptions: {
          completeSingle: false,
        },
      })

      editor.on("change", handleChange)
      editor.on("focus", handleFocus)
      editor.on("blur", handleBlur)
      setEditor(editor)
      // updateMarkings(editor, [bindingMarker])
    }

    return () => {
      editor?.off("change", handleChange)
      editor?.off("focus", handleFocus)
      editor?.off("blur", handleBlur)
    }
  }, [])

  const inputState = {
    focus: previewVisible,
    error: false,
    height,
  }

  return (
    <div>
      <Global styles={codemirrorStyle} />
      <Trigger
        _css={css`
          padding: 0;
        `}
        position="bl"
        autoAlignPopupWidth
        withoutPadding
        withoutShadow
        closeOnClick={false}
        popupVisible={previewVisible}
        content={<CodePreview preview={preview} />}
        showArrow={false}
        colorScheme="white"
      >
        <div>
          <div
            className={className}
            ref={codeTargetRef}
            css={applyCodeEditorStyle(inputState)}
            {...otherProps}
          >
            <div id="hintBody" />
          </div>
        </div>
      </Trigger>
    </div>
  )
}

CodeEditor.displayName = "CodeEditor"
