import CheckList from "@editorjs/checklist"
import Code from "@editorjs/code"
import EditorJS from "@editorjs/editorjs"
import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import InlineCode from "@editorjs/inline-code"
import List from "@editorjs/list"
import Marker from "@editorjs/marker"
import Table from "@editorjs/table"
import parser from "editorjs-html"
import {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import { ICustomRef } from "@/widgetLibrary/RichTextWidget/interface"

export const useInitConfig = (
  defaultText: string,
  handleOnChange: (value: unknown) => void,
  ref: ForwardedRef<ICustomRef>,
) => {
  const editorRef = useRef<EditorJS | null>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      editorRef.current?.focus(true)
    },
  }))

  const handleImageUpload = useCallback((file: Blob) => {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader()
      reader.onload = function () {
        return resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = new EditorJS({
        holder: "editor-container",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          code: Code,
          list: {
            class: List,
            inlineToolbar: true,
          },
          checklist: {
            class: CheckList,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file: Blob) {
                  return handleImageUpload(file).then((data) => {
                    return {
                      success: 1,
                      file: {
                        url: data,
                      },
                    }
                  })
                },
              },
            },
          },
          marker: {
            class: Marker,
            inlineToolbar: true,
          },
          inlineCode: {
            class: InlineCode,
            inlineToolbar: true,
          },
          embed: Embed,
        },
        data: {
          blocks: [
            {
              type: "paragraph",
              data: {
                text: defaultText,
                level: 1,
              },
            },
          ],
        },
        onChange: async (_) => {
          const blocks = await _.saver.save()
          const htmlParser = parser()
          try {
            const html = htmlParser.parse(blocks).join("\n")
            editorRef.current?.emit("change", html)
          } catch (e) {}
        },
      })
      editorRef.current = editorInstance
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [handleImageUpload, defaultText])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.isReady.then(() => {
        editorRef.current?.on("change", handleOnChange)
      })
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.isReady.then(() => {
          editorRef.current?.off("change", handleOnChange)
        })
      }
    }
  }, [handleOnChange])
}
