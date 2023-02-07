import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Upload, UploadItem } from "@illa-design/react"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyValidateMessageWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { uploadLayoutStyle } from "@/widgetLibrary/UploadWidget/style"
import { UploadWidgetProps, WrappedUploadProps } from "./interface"
import { getFileString, toBase64 } from "./util"

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
      {...(!!fileType.length && { accept: fileType.join(",") })}
      {...(fileList && {
        fileList,
      })}
      onRemove={onRemove}
      onChange={(files, file) => {
        onChange?.(files, file)
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
        }).then((value) => {
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
                value: values.map((data) => data.value),
                parsedValue: parsedValues.map((data) => data.value),
                validateMessage: message,
              },
            },
          ])
        })
      }}
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

  const [currentFileList, setFileList] = useState<UploadItem[] | null>(null)
  const fileListRef = useRef<UploadItem[]>([])
  let isDelete = false

  const handleOnRemove = (file: UploadItem, fileList: UploadItem[]) => {
    console.log("remove: ", file, fileList, fileListRef.current)
    const files = [...fileListRef.current].filter(
      (curFile) => curFile.uid !== file.uid && curFile.name !== file.name,
    )
    fileListRef.current = files
    setFileList(files)
    console.log("remove2: ", files)
    isDelete = true
    return true
  }

  const onChanges = (fileList: UploadItem[], file: UploadItem) => {
    console.log("chNaage 1: ", fileList, file, isDelete, currentFileList)
    if (selectionType === "single") {
      setFileList([file])
      fileListRef.current = [file]
      return
    }
    const allCompelet = fileList.every(
      (file) => file.status === "error" || file.status === "done",
    )
    if ((allCompelet && !isDelete) || fileList.length === 0) {
      console.log("Done: ", fileList)
      const newFileList = appendFiles
        ? [...fileListRef.current, ...fileList]
        : fileList

      fileListRef.current = newFileList
      setFileList(newFileList)
    }
    isDelete = false
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
    <>
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
    </>
  )
}
UploadWidget.displayName = "UploadWidget"
