import { FC, useEffect, useMemo, useRef, useState } from "react"
import { CodeEditorProps, EditorModes } from "./interface"

import CodeMirror, { Editor } from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/duotone-dark.css"
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
import { bindingMarker } from "@/components/CodeEditor/markHelpers"

export enum AutocompleteDataType {
  OBJECT = "OBJECT",
  NUMBER = "NUMBER",
  ARRAY = "ARRAY",
  FUNCTION = "FUNCTION",
  BOOLEAN = "BOOLEAN",
  STRING = "STRING",
  UNKNOWN = "UNKNOWN",
}

export type FieldEntityInformation = {
  entityName?: string
  expectedType?: AutocompleteDataType
  entityType?: "ACTION" | "WIDGET" | "JSACTION"
  entityId?: string
  propertyPath?: string
}

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
    value,
    defaultValue,
    onBlur,
    onChange,
    ...otherProps
  } = props
  const codeTargetRef = useRef<HTMLDivElement>(null)
  const [hinters, setHinters] = useState<Hinter[]>([])
  const [hinterOpen, setHinterOpen] = useState<boolean>()

  const handleBlur = (instance: Editor, event: FocusEvent) => {
    onBlur?.()
  }

  const handleChange = (editor: Editor, change: CodeMirror.EditorChange) => {
    // callback
    onChange?.(editor.getValue())
    // [TODO] autocomplete
  }

  const handleAutocompleteVisibility = (cm: CodeMirror.Editor) => {
    // if (!isFocused) return;
    const entityInformation: FieldEntityInformation = {}
    let hinterOpen = false
    for (let i = 0; i < hinters.length; i++) {
      hinterOpen = hinters[i].showHint(cm, entityInformation, {})
      if (hinterOpen) break
    }
    setHinterOpen(hinterOpen)
  }

  const handleAutocompleteKeyup = (
    cm: CodeMirror.Editor,
    event: KeyboardEvent,
  ) => {
    console.log(cm, event, cm.getMode())
    const modeName = cm.getModeAt(cm.getCursor()).name
    console.log(modeName, "modeName")
    cm.showHint({
      hint: CodeMirror.hint.sql,
      completeSingle: false, // 是否立即补全
    });
    // CodeMirror.showHint(cm, CodeMirror.hint.javascript)
    // cm.simpleHint
    const key = event.key
    // if (isModifierKey(key)) return;
    const cursor = cm.getCursor()
    const line = cm.getLine(cursor.line)
    let showAutocomplete = false
    /* Check if the character before cursor is completable to show autocomplete which backspacing */
    if (key === "/") {
      showAutocomplete = true
    } else if (event.code === "Backspace") {
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
    showAutocomplete && handleAutocompleteVisibility(cm)
  }

  const handleEditorFocus = (cm: CodeMirror.Editor) => {
    // setState({ isFocused: true });
    if (!cm.state.completionActive) {
      const entityInformation: FieldEntityInformation = {}
      hinters
        .filter((hinter) => hinter.fireOnFocus)
        .forEach(
          (hinter) => hinter.showHint && hinter.showHint(cm, entityInformation),
        )
    }
  }

  const updateMarkings = (
    editor: CodeMirror.Editor,
    marking: Array<(editor: CodeMirror.Editor) => void>,
  ) => {
    marking.forEach((helper) => helper(editor))
  }
  CodeMirror.commands.autocomplete = function (cm) {
    const doc = cm.getDoc()
    const POS = doc.getCursor()
    const mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state)
      .mode.name
    const modeName = cm.getModeAt(cm.getCursor()).name
    console.log(mode, POS, modeName,"autocomplete")
    if (mode == "sql") {
      CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        tables: {
          "table1": [ "col_A", "col_B", "col_C" ],
          "table2": [ "other_columns1", "other_columns2" ]
        },
        completeSingle: false,
        disableKeywords: false,
      })
      // cm.showHint({
      //   hint: CodeMirror.hint.sql,
      //   completeSingle: false, // 是否立即补全
      // });
    } else if (mode == "javascript") {
      CodeMirror.showHint(cm, CodeMirror.hint.javascript, {
        completeSingle: false,
      })
    }
  }

  useEffect(() => {
    const editor = CodeMirror(codeTargetRef.current!, {
      mode: EditorModes[mode],
      placeholder,
      lineNumbers: mode !== "TEXT_JS",
      autocapitalize: false,
      autofocus: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      tabSize: 2,
      hintOptions: {
        completeSingle: false,
      },
    })

    editor.on("change", handleChange)
    editor.on("blur", handleBlur)
    // editor.on("keyup", handleAutocompleteKeyup)
    editor.on("keyup", (cm) => {
      //cm.showHint()
      cm.execCommand("autocomplete")
    })

    updateMarkings(editor, [bindingMarker])
    return () => {
      editor.off("change", handleChange)
      editor.off("blur", handleBlur)
    }
  }, [])

  return (
    <div className={className} ref={codeTargetRef} {...otherProps}>
      <div id="hintBody" />
    </div>
  )
}

CodeEditor.displayName = "CodeEditor"
