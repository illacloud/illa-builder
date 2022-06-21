import { FC, useEffect, useRef, useState } from "react"
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
import "codemirror/addon/lint/lint.css"
// tern
import tern from "tern"
import "codemirror/addon/tern/worker"
import "codemirror/addon/tern/tern.css"
import "codemirror/addon/tern/tern"
// import 'tern/lib/tern';
// import 'tern/plugin/complete_strings';
// import 'tern/doc/demo/polyfill';
// import 'tern/lib/signal';
// import 'tern/lib/def';
// import 'tern/lib/comment';
// import 'tern/lib/infer';
// import "tern/plugin/doc_comment"
import ecmascript from "tern/defs/ecmascript.json"

// defineMode
import "./modes"
import "./hinter"
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
import { isExpectType } from "@/components/CodeEditor/utils"
import ReactDOM from "react-dom";
import {AutoCompleteItem} from "@/components/EditorInput/AutoComplete/item";
import {HintComplement} from "@/components/EditorInput/AutoComplete/HintComplement";

export type Hinter = {
  showHint: (
    editor: CodeMirror.Editor,
    entityInformation: FieldEntityInformation,
    additionalData?: any,
  ) => boolean
  update?: (data: any) => void
  fireOnFocus?: boolean
}

window.tern = tern

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    className,
    mode = "TEXT_JS",
    placeholder = "input sth",
    expectedType = "String",
    borderRadius = "8px",
    value,
    height = "auto",
    readOnly,
    onBlur,
    onChange,
    ...otherProps
  } = props
  const codeTargetRef = useRef<HTMLDivElement>(null)
  const sever = useRef<CodeMirror.TernServer>()
  const [editor, setEditor] = useState<Editor>()
  const [hinters, setHinters] = useState<Hinter[]>([])
  const [hinterOpen, setHinterOpen] = useState<boolean>()
  const [preview, setPreview] = useState<ResultPreview>({
    state: "default",
    type: expectedType,
  })
  const [previewVisible, setPreviewVisible] = useState<boolean>()
  const [focus, setFocus] = useState<boolean>()
  const handleFocus = () => {
    setFocus(true)
  }

  const handleBlur = (instance: Editor, event: FocusEvent) => {
    onBlur?.()
    setFocus(false)
    setPreviewVisible(false)
  }

  const handleChange = (editor: Editor, change: CodeMirror.EditorChange) => {
    handleAutocomplete(editor)
    const currentValue = editor?.getValue()
    let previewType = expectedType
    try {
      let calcResult = evaluateDynamicString("", currentValue, {})
      // if (!currentValue?.includes("{{")) {
      //   calcResult = getEvalValue(previewType, calcResult)
      // }
      isExpectType(previewType, calcResult)
      onChange?.(currentValue, calcResult)
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

  const handleAutocompleteAddition = (cm: CodeMirror.Editor) => {
    // if (!isFocused) return;
    const entityInformation: FieldEntityInformation = {}
    let hinterOpen = false
    for (let i = 0; i < hinters.length; i++) {
      hinterOpen = hinters[i].showHint(cm, entityInformation, {})
      if (hinterOpen) break
    }
    setHinterOpen(hinterOpen)
  }

  const handleAutocomplete = (cm: CodeMirror.Editor) => {
    const modeName = cm.getModeAt(cm.getCursor()).name
    console.log(modeName, "modeName")
    if (modeName == "sql") {
      CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        tables: {
          table1: ["col_A", "col_B", "col_C"],
          table2: ["other_columns1", "other_columns2"],
        },
        completeSingle: false,
      })
    } else if (modeName == "javascript") {
      sever.current?.complete(cm)
      // cm.showHint({
      //   hint: CodeMirror.hint.javascript,
      //   completeSingle: false, // 是否立即补全
      // })
    }
  }

  const updateMarkings = (
    editor: CodeMirror.Editor,
    marking: Array<(editor: CodeMirror.Editor) => void>,
  ) => {
    marking.forEach((helper) => helper(editor))
  }

  useEffect(() => {
    sever.current = new CodeMirror.TernServer({
      // @ts-ignore type warning

      defs: [ecmascript, {}],
      completionTip: (data) => {
        console.log(data, 'completionTip')
        let div = document.createElement("div")
        let a = ReactDOM.render(
            <HintComplement />,
            div,
        )
        return div
      },
    })
  }, [])

  useEffect(() => {
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
        readOnly: readOnly && "nocursor",
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
