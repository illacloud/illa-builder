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
import { useBasicSetup } from "@/components/NewCodeEditor/CodeMirror/extensions"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/NewCodeEditor/CodeMirror/extensions/interface"
import { ILLACodeMirrorProps } from "@/components/NewCodeEditor/CodeMirror/interface"
import { applyEditorWrapperStyle } from "@/components/NewCodeEditor/CodeMirror/style"
import { ILLACodeMirrorTheme } from "@/components/NewCodeEditor/CodeMirror/theme"
import { HintToolTip } from "@/components/NewCodeEditor/HintToolTip"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

// thk ReactCodeMirror:https://github.com/uiwjs/react-codemirror

const compartments: Compartment[] = []

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
    onChange,
  } = props

  const [isFocus, setIsFocus] = useState(false)

  const editorViewRef = useRef<EditorView>()
  const editorWrapperRef = useRef<HTMLDivElement | null>(null)
  const editorStateRef = useRef<EditorState>()

  const extensionOptions = useMemo(() => {
    return {
      showLineNumbers,
      lang,
      codeType,
      expressions,
      executionResult,
    }
  }, [codeType, executionResult, expressions, lang, showLineNumbers])

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
          }, 60)
        }
      }
    })
  }, [])

  const changeUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      const currentString = viewUpdate.state.doc.toString()
      if (viewUpdate.changes && currentString !== value) {
        onChange?.(currentString)
      }
    })
  }, [onChange, value])

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

  const allExtensions = useMemo(() => {
    return [
      EditorView.lineWrapping,
      basicExtensions,
      defaultThemeOption,
      focusUpdateListener,
      changeUpdateListener,
      readOnlyStateChangeEffect,
      editableStateChangeEffect,
      placeholderExt,
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
    extensions,
  ])

  const extensionsWithCompartment = useMemo(() => {
    for (let i = compartments.length; i < allExtensions.length; ++i) {
      const compartment = new Compartment()
      compartments.push(compartment)
    }
    return allExtensions.map((ext, index) => compartments[index].of(ext))
  }, [allExtensions])

  const reconfigure = useCallback(
    (view?: EditorView) => {
      if (!view) return
      const effects: StateEffect<unknown>[] = []
      allExtensions.forEach((e, i) => {
        if (compartments[i].get(view.state) !== e) {
          const effect = compartments[i].reconfigure(e)
          effects.push(effect)
        }
      })
      if (effects.length > 0) {
        view.dispatch({ effects })
      }
    },
    [allExtensions],
  )

  useEffect(() => {
    if (editorWrapperRef.current && !editorStateRef.current) {
      let startState = EditorState.create({
        doc: value,
        extensions: extensionsWithCompartment,
      })
      if (editorViewRef.current) {
        editorViewRef.current.setState(startState)
        editorStateRef.current = startState
      } else {
        editorViewRef.current = new EditorView({
          state: startState,
          parent: editorWrapperRef.current,
        })
      }
    }
  }, [extensionsWithCompartment, value])

  useEffect(() => {
    reconfigure(editorViewRef.current)
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
        css={applyEditorWrapperStyle(hasError, isFocus)}
      />
    </HintToolTip>
  )
}
