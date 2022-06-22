import { FC, useEffect, useRef, useState, useMemo } from "react"
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
// defineMode
import "./modes"
import "./hinter"
import { TernServer } from "./TernSever"
import { Trigger } from "@illa-design/trigger"
import {
  ResultPreview,
  CodeEditorProps,
  EditorModes,
  FieldEntityInformation,
} from "./interface"
import { applyCodeEditorStyle, codemirrorStyle } from "./style"
import { CodePreview } from "./CodePreview"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { isExpectType } from "@/components/CodeEditor/utils"

export type Hinter = {
  showHint: (
    editor: CodeMirror.Editor,
    entityInformation: FieldEntityInformation,
    additionalData?: any,
  ) => boolean
  update?: (data: any) => void
  fireOnFocus?: boolean
}

export enum AUTOCOMPLETE_CLOSE_KEY {
  Enter,
  Tab,
  Escape,
  Comma,
  Semicolon,
  Space,
  Delete,
  "Ctrl+Backspace",
  OSLeft,
  "(",
  ")",
}

export const isCloseKey = (key: any): key is AUTOCOMPLETE_CLOSE_KEY => {
  return AUTOCOMPLETE_CLOSE_KEY.hasOwnProperty(key);
}

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
  const [preview, setPreview] = useState<ResultPreview>({
    state: "default",
    type: expectedType,
  })
  const [previewVisible, setPreviewVisible] = useState<boolean>()
  const [focus, setFocus] = useState<boolean>()
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
      calcResult = evaluateDynamicString("", currentValue, {})
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
    const key = event.key;
    const code = `${event.ctrlKey ? "Ctrl+" : ""}${event.code}`;
    if (isCloseKey(code) || isCloseKey(key)) {
      editor.closeHint();
      return;
    }
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    let showAutocomplete = false;
    /* Check if the character before cursor is completable to show autocomplete which backspacing */
    if (event.code === "Backspace") {
      const prevChar = line[cursor.ch - 1];
      showAutocomplete = !!prevChar && /[a-zA-Z_0-9.]/.test(prevChar);
    } else if (key === "{") {
      /* Autocomplete for { should show up only when a user attempts to write {{}} and not a code block. */
      const prevChar = line[cursor.ch - 2];
      showAutocomplete = prevChar === "{";
    } else if (key.length == 1) {
      showAutocomplete = /[a-zA-Z_0-9.]/.test(key);
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
    sever.current = TernServer()
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
        scrollbarStyle: "null",
        tabSize: 2,
        value: value ?? "",
        readOnly: readOnly && "nocursor",
        hintOptions: {
          completeSingle: false,
        },
      })

      editor.on("change", handleChange)
      editor.on("keyup", handleKeyUp)
      editor.on("focus", handleFocus)
      editor.on("blur", handleBlur)
      setEditor(editor)
      // updateMarkings(editor, [bindingMarker])
    }

    return () => {
      editor?.off("change", handleChange)
      editor?.off("keyup", handleKeyUp)
      editor?.off("focus", handleFocus)
      editor?.off("blur", handleBlur)
      setEditor(undefined)
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
