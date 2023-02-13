import { closeCompletion } from "@codemirror/autocomplete"
import {
  Compartment,
  EditorState,
  Extension,
  StateEffect,
} from "@codemirror/state"
import {
  EditorView,
  placeholder as placeholderExtension,
} from "@codemirror/view"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useBasicSetup } from "@/components/CodeEditor/CodeMirror/extensions"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ILLACodeMirrorProps } from "@/components/CodeEditor/CodeMirror/interface"
import { applyEditorWrapperStyle } from "@/components/CodeEditor/CodeMirror/style"
import { ILLACodeMirrorTheme } from "@/components/CodeEditor/CodeMirror/theme"
import { HintToolTip } from "@/components/CodeEditor/HintToolTip"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

// thk ReactCodeMirror:https://github.com/uiwjs/react-codemirror
export const ILLACodeMirrorCore: FC<ILLACodeMirrorProps> = (props) => {
  const {
    extensions = [],
    value,
    height = "",
    maxHeight = "",
    minHeight = "",
    width = "",
    maxWidth = "",
    minWidth = "",
    editable = true,
    readOnly = false,
    placeholder,
    showLineNumbers = false,
    lang = CODE_LANG.JAVASCRIPT,
    codeType = CODE_TYPE.EXPRESSION,
    expressions = [],
    executionResult = {},
    result = "",
    hasError = false,
    resultType = VALIDATION_TYPES.STRING,
    canShowCompleteInfo = false,
    wrapperCss,
    sqlScheme = {},
    singleLine,
    onChange,
  } = props

  const [isFocus, setIsFocus] = useState(false)

  const editorViewRef = useRef<EditorView>()
  const editorWrapperRef = useRef<HTMLDivElement | null>(null)
  const compartmentsRef = useRef<Compartment[]>([])

  const extensionOptions = useMemo(() => {
    return {
      showLineNumbers,
      lang,
      codeType,
      expressions,
      executionResult,
      canShowCompleteInfo,
      sqlScheme,
    }
  }, [
    canShowCompleteInfo,
    codeType,
    executionResult,
    expressions,
    lang,
    showLineNumbers,
    sqlScheme,
  ])

  const basicExtensions = useBasicSetup(extensionOptions)

  const defaultThemeOption = useMemo(
    () =>
      EditorView.theme({
        "&": {
          height,
          minHeight,
          maxHeight,
          width,
          maxWidth,
          minWidth,
        },
        ...ILLACodeMirrorTheme,
      }),
    [height, maxHeight, maxWidth, minHeight, minWidth, width],
  )

  const focusUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      if (viewUpdate.focusChanged) {
        setIsFocus(viewUpdate.view.hasFocus)
        if (!viewUpdate.view.hasFocus) {
          setTimeout(() => {
            closeCompletion(viewUpdate.view)
          }, 500)
        }
      }
    })
  }, [])

  const changeUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      const currentString = viewUpdate.state.doc.toString()
      if (viewUpdate.docChanged) {
        onChange?.(currentString)
      }
    })
  }, [onChange])

  const readOnlyStateChangeEffect: Extension = useMemo(
    () => EditorState.readOnly.of(readOnly),
    [readOnly],
  )

  const editableStateChangeEffect: Extension = useMemo(
    () => EditorView.editable.of(editable),
    [editable],
  )

  const placeholderExt: Extension = useMemo(() => {
    return typeof placeholder === "string"
      ? placeholderExtension(placeholder)
      : []
  }, [placeholder])

  const singleLineExt: Extension = useMemo(() => {
    return singleLine
      ? EditorState.transactionFilter.of((tr) => {
          return tr.newDoc.lines > 1 ? [] : [tr]
        })
      : EditorView.lineWrapping
  }, [singleLine])

  const allExtensions = useMemo(() => {
    return [
      basicExtensions,
      defaultThemeOption,
      focusUpdateListener,
      changeUpdateListener,
      readOnlyStateChangeEffect,
      editableStateChangeEffect,
      placeholderExt,
      singleLineExt,
      extensions,
    ]
  }, [
    basicExtensions,
    defaultThemeOption,
    focusUpdateListener,
    changeUpdateListener,
    readOnlyStateChangeEffect,
    editableStateChangeEffect,
    placeholderExt,
    singleLineExt,
    extensions,
  ])

  const extensionsWithCompartment = useMemo(() => {
    for (
      let i = compartmentsRef.current.length;
      i < allExtensions.length;
      i++
    ) {
      const compartment = new Compartment()
      compartmentsRef.current.push(compartment)
    }
    return allExtensions.map((ext, index) =>
      compartmentsRef.current[index].of(ext),
    )
  }, [allExtensions])

  useEffect(() => {
    if (
      !editorViewRef.current ||
      (!isFocus && value !== editorViewRef.current.state.doc.toString())
    ) {
      const state = EditorState.create({
        doc: value,
        extensions: extensionsWithCompartment,
      })
      if (editorViewRef.current) {
        editorViewRef.current.setState(state)
      } else {
        if (editorWrapperRef.current) {
          editorViewRef.current = new EditorView({
            state,
            parent: editorWrapperRef.current,
          })
        }
      }
    }
  }, [value, extensionsWithCompartment, isFocus])

  const reconfigure = useCallback(
    (view?: EditorView) => {
      if (view) {
        const effects: StateEffect<unknown>[] = []
        allExtensions.forEach((e, i) => {
          if (compartmentsRef.current[i].get(view.state) !== e) {
            effects.push(compartmentsRef.current[i].reconfigure(e))
          }
        })
        if (effects.length > 0) {
          view.dispatch({ effects })
        }
      }
    },
    [allExtensions],
  )

  useEffect(() => {
    if (editorViewRef.current) {
      reconfigure(editorViewRef.current)
    }
  }, [reconfigure])

  return (
    <HintToolTip
      isEditorFocused={isFocus}
      result={!result ? '""' : result}
      hasError={hasError}
      resultType={resultType}
    >
      <div
        ref={editorWrapperRef}
        css={[
          applyEditorWrapperStyle(hasError, isFocus, editable, readOnly),
          wrapperCss,
        ]}
      />
    </HintToolTip>
  )
}
