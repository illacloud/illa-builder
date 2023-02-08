import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Upload, UploadItem } from "@illa-design/react"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyValidateMessageWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import {
  uploadContainerStyle,
  uploadLayoutStyle,
} from "@/widgetLibrary/UploadWidget/style"
import { UploadWidgetProps, WrappedUploadProps } from "./interface"
import { getFileString, toBase64 } from "./util"

type ValueType = Array<{ status: string; value: any }>

const getFilteredValue = (values: ValueType = []) => {
  const filteredValue = values.filter(
    (data) => data.value !== undefined && data.status !== "rejected",
  )
  if (filteredValue && filteredValue.length > 0) {
    return filteredValue.map((data) => data.value)
  }
  return []
}

export const WrappedUpload: FC<WrappedUploadProps> = (props) => {
  const {
    selectionType,
    type,
    displayName,
    showFileList,
    disabled,
    fileType = [],
    loading,
    buttonText,
    dropText,
    colorScheme,
    variant,
    fileList,
    onRemove,
    onChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
  } = props

  const isDrag = type === "dropzone"
  const inputAcceptType = fileType.join(",")

  const handleFileChange = useCallback(
    (files: UploadItem[], file: UploadItem) => {
      new Promise((resolve) => {
        ;(async () => {
          const values = await Promise.allSettled(
            files.map(async (file) => await toBase64(file)),
          )
          const parsedValues = await Promise.allSettled(
            files.map(async (file) => {
              const res = await getFileString(file)
              return res
            }),
          )
          resolve({
            values,
            parsedValues,
          })
        })()
      })
        .then((value) => {
          const { values, parsedValues } = value as {
            values: any[]
            parsedValues: any[]
          }
          const message = getValidateMessage(files)
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                files:
                  files.map((file) => ({
                    lastModified: file.originFile?.lastModified,
                    name: file.originFile?.name,
                    size: file.originFile?.size,
                    type: file.originFile?.type,
                  })) || {},
                value: getFilteredValue(values),
                parsedValue: getFilteredValue(parsedValues),
                validateMessage: message,
              },
            },
          ])
        })
        .then(() => {
          onChange?.(files, file)
        })
    },
    [
      displayName,
      getValidateMessage,
      getFilteredValue,
      handleUpdateMultiExecutionResult,
      onChange,
    ],
  )

  return (
    <Upload
      action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
      disabled={disabled}
      text={isDrag ? dropText : buttonText}
      colorScheme={colorScheme}
      variant={variant}
      loading={loading}
      multiple={!!(selectionType === "multiple")}
      directory={selectionType === "directory"}
      drag={isDrag}
      {...(!!inputAcceptType && { accept: inputAcceptType })}
      {...(fileList && {
        fileList,
      })}
      onRemove={onRemove}
      onChange={handleFileChange}
      showUploadList={showFileList}
    />
  )
}
WrappedUpload.displayName = "WrappedUpload"

export const UploadWidget: FC<UploadWidgetProps> = (props) => {
  const {
    type,
    buttonText,
    dropText,
    fileType,
    selectionType,
    appendFiles,
    showFileList,
    parseValue,
    displayName,
    customRule,
    tooltipText,
    required,
    minFiles,
    maxFiles,
    minSizeType,
    maxSizeType,
    maxSize,
    minSize,
    validateMessage,
    hideValidationMessage,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const fileListRef = useRef<UploadItem[]>([])
  const [currentFileList, setFileList] = useState<UploadItem[]>(
    fileListRef.current,
  )

  const fileCountRef = useRef<number>(0)
  const previousValueRef = useRef<UploadItem[]>([])

  const handleOnRemove = (file: UploadItem, fileList: UploadItem[]) => {
    let files = [...previousValueRef.current]
    const currentFilesKeys = previousValueRef.current.map(
      (f) => f.uid || f.name,
    )
    const index = currentFilesKeys.indexOf(file.uid || file.name)
    files.splice(index, 1)
    setFileList([...files])
    previousValueRef.current = [...files]
    fileListRef.current = [...files]
    return true
  }

  const onChanges = (fileList: UploadItem[], file: UploadItem) => {
    if (selectionType === "single") {
      setFileList([file])
      fileListRef.current = [file]
      previousValueRef.current = [file]
      return
    }

    let files = [...previousValueRef.current]
    if (file.status === "init") {
      files.push(file)
      previousValueRef.current = [...files]
      setFileList(files)
      fileCountRef.current += 1
      return
    }
    const currentFilesKeys = previousValueRef.current.map(
      (f) => f.uid || f.name,
    )
    const index = currentFilesKeys.indexOf(file.uid || file.name)
    if (index < 0) {
      return
    }
    files.splice(index, 1, file)
    setFileList([...files])
    previousValueRef.current = [...files]

    if (files.length === fileCountRef.current + fileListRef.current.length) {
      const allSettled = files.every(
        (f) => f.status === "error" || f.status === "done",
      )
      if (allSettled) {
        const newList = appendFiles
          ? files
          : files.slice(fileListRef.current.length)
        setFileList(newList)
        console.log({ newList })
        fileListRef.current = newList
        previousValueRef.current = newList
        fileCountRef.current = 0
      }
    }

    return
  }

  const getValidateMessage = useCallback(
    (value?: UploadItem[]) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value: value || [],
          minFiles,
          maxFiles,
          minSize,
          minSizeType,
          maxSizeType,
          maxSize,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [
      customRule,
      hideValidationMessage,
      minFiles,
      maxFiles,
      minSize,
      minSizeType,
      maxSizeType,
      maxSize,
      required,
    ],
  )

  const handleValidate = useCallback(
    (value: UploadItem[] | null) => {
      if (!value) {
        return ""
      }
      const message = getValidateMessage(value)
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
  )

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      type,
      buttonText,
      dropText,
      fileType,
      selectionType,
      appendFiles,
      showFileList,
      parseValue,
      displayName,
      customRule,
      tooltipText,
      required,
      minFiles,
      maxFiles,
      maxSize,
      minSize,
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {
        return handleValidate(currentFileList)
      },
      setDisable: (value: boolean) => {
        handleUpdateDsl({
          disabled: value,
        })
      },
      setHidden: (value: boolean) => {
        handleUpdateDsl({
          hidden: value,
        })
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    type,
    buttonText,
    dropText,
    fileType,
    selectionType,
    appendFiles,
    showFileList,
    parseValue,
    displayName,
    customRule,
    tooltipText,
    required,
    minFiles,
    maxFiles,
    maxSize,
    minSize,
    hideValidationMessage,
    currentFileList,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  ])

  return (
    <div css={uploadContainerStyle}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={uploadLayoutStyle}>
          <WrappedUpload
            {...props}
            fileList={currentFileList}
            onChange={onChanges}
            onRemove={handleOnRemove}
            getValidateMessage={getValidateMessage}
          />
        </div>
      </TooltipWrapper>
      <div css={applyValidateMessageWrapperStyle(0, "left", true)}>
        <InvalidMessage validateMessage={validateMessage} />
      </div>
    </div>
  )
}
UploadWidget.displayName = "UploadWidget"
