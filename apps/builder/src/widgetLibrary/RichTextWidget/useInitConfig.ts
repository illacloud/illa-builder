import CheckList from "@editorjs/checklist"
import Code from "@editorjs/code"
import EditorJS from "@editorjs/editorjs"
import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import InlineCode from "@editorjs/inline-code"
import List from "@editorjs/list"
import Marker from "@editorjs/marker"
import parser from "editorjs-html"
import { MDfromBlocks } from "editorjs-md-parser"
import { ForwardedRef, useEffect, useImperativeHandle, useRef } from "react"
import { ICustomRef } from "@/widgetLibrary/RichTextWidget/interface"
import { handleImageUpload, parseCheckList } from "./utils"

export const useInitConfig = (
  defaultText: string,
  handleOnChange: (value: unknown) => void,
  handleMdValue: (value: unknown) => void,
  ref: ForwardedRef<ICustomRef>,
  id: string,
) => {
  const editorRef = useRef<EditorJS | null>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      editorRef.current?.focus(true)
    },
  }))

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = new EditorJS({
        holder: id,
        placeholder: defaultText,
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
        onChange: async (_) => {
          const blocks = await _.saver.save()
          const htmlParser = parser({
            checklist: parseCheckList,
          })
          try {
            const html = htmlParser.parse(blocks).join("\n")
            editorRef.current?.emit("change", html)
            MDfromBlocks(blocks.blocks).then((md) => {
              editorRef.current?.emit("mdValue", md)
            })
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
  }, [defaultText, id])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.isReady.then(() => {
        editorRef.current?.on("change", handleOnChange)
        editorRef.current?.on("mdValue", handleMdValue)
      })
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.isReady.then(() => {
          editorRef.current?.off("change", handleOnChange)
          editorRef.current?.off("mdValue", handleMdValue)
        })
      }
    }
  }, [handleMdValue, handleOnChange])
}
