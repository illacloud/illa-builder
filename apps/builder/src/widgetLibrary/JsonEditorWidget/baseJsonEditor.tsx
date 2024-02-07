import { json } from "@codemirror/lang-json"
import { githubLight } from "@uiw/codemirror-theme-github"
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { forwardRef, useMemo, useRef } from "react"
import { BaseJsonEditorProps } from "@/widgetLibrary/JsonEditorWidget/interface"
import { baseJsonEditorStyle } from "@/widgetLibrary/JsonEditorWidget/style"

export const BaseJsonEditor = forwardRef<
  ReactCodeMirrorRef,
  BaseJsonEditorProps
>(({ value, disabled, handleOnChange, handleOnBlur, handleOnFocus }, ref) => {
  const cacheValue = useRef<string>("")

  const formatValue = useMemo(() => {
    if (value) {
      try {
        if (value !== cacheValue.current) {
          const currentVal = JSON.stringify(JSON.parse(value), null, 2)
          cacheValue.current = currentVal
          return currentVal
        }
        return cacheValue.current
      } catch (e) {
        console.warn(e)
        if (value !== cacheValue.current) {
          return value
        }
        return cacheValue.current
      }
    } else {
      return ""
    }
  }, [value])

  return (
    <CodeMirror
      ref={ref}
      value={formatValue}
      css={baseJsonEditorStyle}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      theme={githubLight}
      extensions={[json()]}
      editable={!disabled}
      onMouseDownCapture={(e) => e.stopPropagation()}
      onTouchStartCapture={(e) => e.stopPropagation()}
    />
  )
})
BaseJsonEditor.displayName = "BaseJsonEditor"
