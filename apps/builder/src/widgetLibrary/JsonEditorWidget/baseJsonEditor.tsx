import JSONEditor, { JSONEditorOptions } from "jsoneditor"
import "jsoneditor/dist/jsoneditor.css"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { BaseJsonEditorProps, ICustomRef } from "./interface"
import { baseContainerStyle } from "./style"

export const BaseJsonEditor = forwardRef<ICustomRef, BaseJsonEditorProps>(
  ({ value, handleOnChange, handleOnBlur, handleOnFocus }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const editorRef = useRef<JSONEditor | null>(null)
    const singleRef = useRef<boolean>(false)

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          editorRef.current?.focus()
        },
      }),
      [editorRef],
    )

    const cacheOptions: JSONEditorOptions = useMemo(() => {
      return {
        mode: "code",
        onChange: () => {
          if (editorRef.current) {
            try {
              const updatedValue = editorRef.current.get()
              handleOnChange && handleOnChange(JSON.stringify(updatedValue))
            } catch (e) {
              console.warn(e)
            }
          }
        },
        onBlur: handleOnBlur,
        onFocus: handleOnFocus,
        mainMenuBar: false,
        sortObjectKeys: false,
      }
    }, [handleOnBlur, handleOnChange, handleOnFocus])

    useEffect(() => {
      if (containerRef.current && !singleRef.current) {
        const options: JSONEditorOptions = cacheOptions
        editorRef.current = new JSONEditor(containerRef.current, options)
        singleRef.current = true
      }
    }, [cacheOptions])

    useEffect(() => {
      return () => {
        if (editorRef.current) {
          editorRef.current.destroy()
          editorRef.current = null
          singleRef.current = false
        }
      }
    }, [])

    useEffect(() => {
      if (!value) {
        editorRef.current?.update(JSON.parse("{}"))
        return
      }
      try {
        const updatedValue = editorRef.current?.get()
        if (
          typeof value == "string" &&
          value !== JSON.stringify(updatedValue)
        ) {
          editorRef.current?.update(JSON.parse(value))
        }
      } catch (e) {
        console.warn(e)
      }
    }, [value])

    return (
      <div
        css={baseContainerStyle}
        ref={containerRef}
        onMouseMoveCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
        style={{ height: "100%", width: "100%" }}
      />
    )
  },
)
BaseJsonEditor.displayName = "BaseJsonEditor"
