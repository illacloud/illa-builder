import { FC, useCallback, useEffect, useRef, useState } from "react"
import { RequestOptions, Upload, UploadItem } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyValidateMessageWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { uploadLayoutStyle } from "@/widgetLibrary/UploadWidget/style"
import { UploadWidgetProps, WrappedUploadProps } from "./interface"
import {
  dataURLtoFile,
  getCurrentList,
  getFilesInfo,
  getFilteredValue,
  getFormattedFileList,
  getIsAllFileDone,
  handleHasFileOversize,
} from "./util"

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
    parseValue,
    fileList,
    onRemove,
    handleOnChange,
    onChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
    customRequest,
  } = props

  const isDrag = type === "dropzone"
  const inputAcceptType = fileType.join(",")
  const prevFileList = useRef<UploadItem[]>(fileList ?? [])

  const updateDataToLeftTree = useCallback(
    (value: any) => {
      const {
        values,
        parsedValues,
        fileList = [],
      } = value as {
        values: any[]
        parsedValues: any[]
        fileList: UploadItem[]
      }
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            files: getFilesInfo(fileList),
            data: getFilteredValue(values),
            value: getFilteredValue(values, "base64"),
            parsedValue: getFilteredValue(parsedValues),
            validateMessage: getValidateMessage(fileList),
            currentList: getCurrentList(fileList),
          },
        },
      ])
    },
    [displayName, getValidateMessage, handleUpdateMultiExecutionResult],
  )

  const handleFileListChange = useCallback(
    async (fileList: UploadItem[]) => {
      const values = await getFormattedFileList(fileList, !!parseValue)
      await updateDataToLeftTree(values)
      await handleOnChange?.()
    },
    [handleOnChange, parseValue, updateDataToLeftTree],
  )

  useEffect(() => {
    if (
      !fileList ||
      prevFileList.current === fileList ||
      !getIsAllFileDone(fileList)
    ) {
      return
    }
    handleHasFileOversize(prevFileList.current, fileList)
    prevFileList.current = fileList
    handleFileListChange(fileList)
  }, [fileList, handleFileListChange])

  return (
    <Upload
      customRequest={customRequest}
      disabled={disabled}
      text={isDrag ? dropText : buttonText}
      colorScheme={colorScheme}
      variant={variant}
      loading={loading}
      multiple={selectionType === "multiple"}
      directory={selectionType === "directory"}
      drag={isDrag}
      {...(!!inputAcceptType && { accept: inputAcceptType })}
      {...(fileList && {
        fileList,
      })}
      onRemove={onRemove}
      onChange={onChange}
      showUploadList={showFileList}
    />
  )
}
WrappedUpload.displayName = "WrappedUpload"

export const UploadWidget: FC<UploadWidgetProps> = (props) => {
  const {
    type,
    buttonText,
    selectionType,
    appendFiles,
    displayName,
    customRule,
    tooltipText,
    required,
    minFiles,
    maxFiles,
    sizeType,
    maxSize,
    currentList,
    value,
    files,
    minSize,
    validateMessage,
    triggerEventHandler,
    hideValidationMessage,
    updateComponentHeight,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const fileListRef = useRef<UploadItem[]>([])
  const [currentFileList, setFileList] = useState<UploadItem[]>([])
  const fileCountRef = useRef<number>(0)
  const previousValueRef = useRef<UploadItem[]>([])

  useEffect(() => {
    const canInitialDragValue =
      currentList &&
      currentList.length > 0 &&
      value &&
      files &&
      fileListRef.current?.length === 0 &&
      previousValueRef.current.length === 0

    if (canInitialDragValue) {
      const shownList = currentList.map((file, index) => {
        const base64 = value[index]
        const info = files[index]
        return {
          ...file,
          originFile: !base64
            ? new File([""], info.name, info)
            : dataURLtoFile(`data:${info.type};base64,${base64}`, info.name),
        }
      }) as UploadItem[]
      setFileList(shownList)
      fileListRef.current = shownList
    }
  }, [currentList, value, files])

  const getFileIndex = useCallback((files: UploadItem[], file: UploadItem) => {
    const currentFilesKeys = files.map((f) => f.uid || f.name)
    return currentFilesKeys.indexOf(file.uid || file.name)
  }, [])

  const handleOnRemove = (file: UploadItem, fileList: UploadItem[]) => {
    const currentFiles =
      previousValueRef.current.length > 0
        ? [...previousValueRef.current]
        : [...(fileListRef.current || [])]
    const index = getFileIndex(currentFiles, file)
    currentFiles.splice(index, 1)
    setFileList(currentFiles)
    fileListRef.current = currentFiles
    if (previousValueRef.current.length > 0) {
      previousValueRef.current = currentFiles
    }
    return true
  }

  const customRequest = (options: RequestOptions) => {
    options.onSuccess()
  }

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  const onChanges = useCallback(
    (fileList: UploadItem[], file: UploadItem) => {
      let files = [...previousValueRef.current]
      if (file.status === "init") {
        files.push(file)
        previousValueRef.current = [...files]
        setFileList(files)
        fileCountRef.current += 1
        return
      }
      const index = getFileIndex(previousValueRef.current, file)
      if (index < 0) {
        return
      }
      files.splice(index, 1, file)
      setFileList(files)
      previousValueRef.current = files
      if (files.length === fileCountRef.current && !!fileCountRef.current) {
        const allSettled = getIsAllFileDone(files)
        if (allSettled) {
          const newList = appendFiles
            ? [...(fileListRef.current || []), ...files]
            : files
          setFileList(newList)
          fileListRef.current = newList
          previousValueRef.current = []
          fileCountRef.current = 0
        }
      }
      return
    },
    [appendFiles, getFileIndex],
  )

  const getValidateMessage = useCallback(
    (value?: UploadItem[]) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          minFiles,
          maxFiles,
          minSize,
          maxSize,
          sizeType,
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
      sizeType,
      maxSize,
      required,
    ],
  )

  const handleValidate = useCallback(
    (value?: UploadItem[]) => {
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
      clearValue: () => {
        handleUpdateDsl({ value: [] })
        setFileList([])
      },
      validate: () => {
        return handleValidate(currentFileList)
      },
      setDisabled: (value: boolean) => {
        handleUpdateDsl({
          disabled: value,
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
    currentFileList,
    displayName,
    handleDeleteGlobalData,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleValidate,
  ])

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={true}
      dynamicOptions={{}}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={uploadLayoutStyle}>
          <WrappedUpload
            {...props}
            fileList={currentFileList}
            onChange={onChanges}
            onRemove={handleOnRemove}
            getValidateMessage={getValidateMessage}
            customRequest={customRequest}
            handleOnChange={handleOnChange}
          />
        </div>
      </TooltipWrapper>
      <div css={applyValidateMessageWrapperStyle(0, "left", true)}>
        <InvalidMessage validateMessage={validateMessage} />
      </div>
    </AutoHeightContainer>
  )
}
UploadWidget.displayName = "UploadWidget"
