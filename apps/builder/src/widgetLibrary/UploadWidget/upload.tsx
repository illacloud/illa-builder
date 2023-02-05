import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Upload, UploadItem } from "@illa-design/react"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { uploadLayoutStyle } from "@/widgetLibrary/UploadWidget/style"
import { UploadWidgetProps, WrappedUploadProps } from "./interface"

// const getFileString = (file: UploadItem) => {
//   const reader = new FileReader()
//   if (file.originFile) {
//     reader.readAsText(file.originFile)
//     reader.onload = (e) => {
//       if (e.target?.readyState != 2) return
//     }
//   }
// }

const toBase64 = (file: UploadItem) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    if (file.originFile) {
      reader.readAsDataURL(file.originFile)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    }
  })

export const WrappedUpload: FC<WrappedUploadProps> = (props) => {
  const {
    selectionType,
    type,
    displayName,
    showFileList,
    disabled,
    fileType,
    appendFiles,
    fileList,
    onChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
  } = props

  return (
    <Upload
      action="/"
      disabled={disabled}
      multiple={!!(selectionType === "multiple")}
      directory={selectionType === "directory"}
      drag={type === "dropzone"}
      {...(fileType && { accept: fileType })}
      // fileList={(fileList && fileList.length) > 0 ? fileList : undefined}
      {...(fileList && {
        fileList,
      })}
      // fileList={fileList}
      onChange={(files, file) => {
        new Promise((resolve) => {
          Promise.all(files.map((file) => toBase64(file))).then((value) =>
            resolve(value),
          )
        })
          .then((value) => {
            const message = getValidateMessage(files)
            console.log({ message })
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
                    })) || "",
                  value,
                  validateMessage: message,
                },
              },
            ])
          })
          .then(() => {
            onChange?.(files, file)
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

  const [fileList, setFileList] = useState<UploadItem[]>([])
  const fileListRef = useRef<UploadItem[]>([])

  const handleChange = useCallback(
    (newFileList: UploadItem[], newFile: UploadItem) => {
      console.log({ newFileList, newFile }, fileListRef.current)
      // if (newFileList.length === 0) {
      //   setFileList([])
      //   fileListRef.current = []
      //   return
      // }
      if (selectionType === "single") {
        setFileList([newFile])
        fileListRef.current = [newFile]
        return
      }
      setFileList([])
      // fileListRef.current = [...fileListRef.current, newFile]
      // setFileList([...fileListRef.current])
      const allCompleted = newFileList.every(
        (file) => file.status === "error" || file.status === "done",
        // file.status !== "init",
        // file.status === "error" || file.status === "done",
      )
      if (allCompleted) {
        const filteredKey = fileListRef.current.map(
          (file) => file.uid || file.name,
        )
        const newKeys = newFileList.map((file) => file.uid || file.name)

        console.log(66666)
        if (appendFiles) {
          // const filteredFile =
          //   fileListRef.current.filter(
          //     (file) => !newKeys.includes(file.uid || file.name),
          //   ) || []
          // setFileList([...newFileList])
          setFileList([...newFileList])
          fileListRef.current = [...newFileList]
        } else {
          const isSame = newFileList.every((file) =>
            filteredKey.includes(file.uid || file.name),
          )
          if (fileListRef.current.length === newFileList.length && isSame) {
            console.log(666)
            return
          }

          const appendedFiles = newFileList.filter(
            (file) => !filteredKey.includes(file.uid || file.name),
          )

          console.log(1, appendedFiles)
          // handle delete
          if (
            newFileList.length < fileListRef.current.length &&
            appendedFiles.length === 0
          ) {
            setFileList([...newFileList])
            fileListRef.current = [...newFileList]
          } else {
            setFileList([...appendedFiles])
            fileListRef.current = [...appendedFiles]
          }
        }
        return
      }
    },
    [fileList, appendFiles, selectionType],
  )

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
    (value: UploadItem[]) => {
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
        return handleValidate(fileList)
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
    fileList,
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
            // fileList={fileListRef.current ? fileList : []}
            // fileList={fileListRef.current}
            // fileList={fileList}
            //{...(fileList.length > 0 && {
            //  fileList,
            //})}
            {...(fileList.length > 0 && {
              fileList,
            })}
            onChange={handleChange}
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
