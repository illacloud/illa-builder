import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js"
import draftToHtml from "draftjs-to-html"
import { FC, forwardRef, useCallback, useEffect, useMemo, useRef } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  BaseRichTextProps,
  RichTextWidgetProps,
} from "@/widgetLibrary/RichTextWidget/interface"
import { containerStyle } from "@/widgetLibrary/RichTextWidget/style"

const WrappedRichText = forwardRef<Editor, BaseRichTextProps>((props, ref) => {
  const { value, handleOnBlur, handleOnChange, handleOnFocus } = props
  const handleImageUpload = useCallback((file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result
        if (data === null || typeof data !== "string") {
          return reject()
        }
        const image = new Image()
        image.src = data
        image.onload = () => {
          resolve({ data: { link: image.src } })
        }
        image.onerror = (error) => {
          reject(error)
        }
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const toolbarConfig = useMemo(() => {
    return {
      options: [
        "blockType",
        "fontSize",
        "inline",
        "colorPicker",
        "list",
        "link",
        "image",
        "embedded",
        "textAlign",
        ,
        "remove",
        "history",
      ],
      inline: {
        options: [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "monospace",
          "superscript",
          "subscript",
        ],
      },
      list: {
        options: ["ordered", "unordered"],
      },
      image: {
        uploadCallback: handleImageUpload,
        alt: { present: true },
        previewImage: true,
        uploadEnabled: true,
        alignmentEnabled: false,
      },
    }
  }, [handleImageUpload])

  const editorState = useMemo(() => {
    if (value) {
      const contentState = convertFromHTML(value)
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(
          contentState.contentBlocks,
          contentState.entityMap,
        ),
      )
    }
    return EditorState.createEmpty()
  }, [value])
  const handleEditorStateChange = (state: EditorState) => {
    const currentValue = draftToHtml(convertToRaw(state.getCurrentContent()))
    if (currentValue !== value) {
      handleOnChange(currentValue)
    }
  }

  return (
    <div css={containerStyle} onMouseDownCapture={(e) => e.stopPropagation()}>
      <Editor
        ref={ref}
        editorState={editorState}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbar={toolbarConfig}
      />
    </div>
  )
})

WrappedRichText.displayName = "WrappedRichText"

export const RichTextWidget: FC<RichTextWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    dynamicHeight,
    dynamicMinHeight,
    dynamicMaxHeight,
    h,
    updateComponentHeight,
    deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
  } = props

  const editorRef = useRef<Editor>(null)

  const dynamicOptions = {
    dynamicMinHeight,
    dynamicMaxHeight,
  }

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: unknown) => {
        if (typeof value !== "string") {
          return
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: value,
            },
          },
        ])
      },
      focus: () => {
        editorRef.current?.focusEditor()
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    displayName,
  ])

  const handleOnChange = useCallback(
    (value: unknown) => {
      if (typeof value !== "string") return
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value,
            },
          },
        ])
        resolve(value)
      }).then(() => {
        triggerEventHandler("change")
      })
    },
    [displayName, handleUpdateMultiExecutionResult, triggerEventHandler],
  )

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={enableAutoHeight}
      dynamicOptions={dynamicOptions}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <WrappedRichText
          {...props}
          ref={editorRef}
          handleOnChange={handleOnChange}
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
        />
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

RichTextWidget.displayName = "RichTextWidget"
