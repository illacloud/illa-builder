import { ContentState, EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import image from "@/assets/richText/image.svg"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { EMPTY_LABEL } from "@/widgetLibrary/RichTextWidget/constants"
import { TOOLBAR_CONFIG } from "@/widgetLibrary/RichTextWidget/constants"
import {
  BaseRichTextProps,
  RichTextWidgetProps,
} from "@/widgetLibrary/RichTextWidget/interface"
import { containerStyle } from "@/widgetLibrary/RichTextWidget/style"

const WrappedRichText = forwardRef<Editor, BaseRichTextProps>((props, ref) => {
  const { value, handleOnBlur, handleOnChange, handleOnFocus } = props
  const [currentState, setCurrentState] = useState(EditorState.createEmpty())
  const cacheValue = useRef<string>("")

  const locale = useMemo(() => {
    const lan = localStorage.getItem("i18nextLng")
    if (lan) {
      return lan.split("-")[0]
    } else {
      return "en"
    }
  }, [])

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
      image: {
        icon: image,
        popupClassName: "imagePopup",
        uploadCallback: handleImageUpload,
        alt: { present: true },
        previewImage: true,
        uploadEnabled: true,
        alignmentEnabled: false,
        defaultSize: {
          width: "100%",
        },
      },
      ...TOOLBAR_CONFIG,
    }
  }, [handleImageUpload])

  const currentContent = useMemo(() => {
    return draftToHtml(convertToRaw(currentState.getCurrentContent()))
  }, [currentState])

  const handleEditorStateChange = (state: EditorState) => {
    const currentValue = draftToHtml(convertToRaw(state.getCurrentContent()))
    setCurrentState(state)
    if (currentValue.trim() !== value?.trim()) {
      handleOnChange(currentValue.trim())
      cacheValue.current = currentValue.trim()
    }
  }

  useEffect(() => {
    if (value) {
      const contentState = htmlToDraft(value)
      const editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          contentState.contentBlocks,
          contentState.entityMap,
        ),
      )
      if (value.trim() !== cacheValue.current.trim()) {
        const current = EditorState.moveSelectionToEnd(editorState)
        setCurrentState(current)
        currentContent.trim() !== EMPTY_LABEL && handleOnChange(value.trim())
      }
    } else {
      setCurrentState(EditorState.createEmpty())
    }
  }, [currentContent, handleOnChange, value])

  return (
    <div
      css={containerStyle}
      onMouseMoveCapture={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <Editor
        ref={ref}
        editorState={currentState}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbar={toolbarConfig}
        localization={{
          locale,
        }}
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
