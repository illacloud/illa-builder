import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import { FC, useCallback, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { isMobileByUserAgent } from "@/utils/userAgent"
import { buttonLayoutStyle } from "@/widgetLibrary/Mobile/CameraWidget/style"
import { AutoHeightContainer } from "@/widgetLibrary/PC/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PC/PublicSector/InvalidMessage"
import { ValidateCheckProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import { handleValidateCheck } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/utils"
import { TooltipWrapper } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper"
import MobileCamera from "./components/MobileCamera"
import PcCamera from "./components/PcCamera"
import { FOLDER_NAME } from "./constant"
import { CameraWidgetProps, FileInfo } from "./interface"
import { UploadStore } from "./store"
import { handleGetValueAfterUpload, uploadFileToDrive } from "./utils"

export const CameraWidget: FC<CameraWidgetProps> = (props) => {
  const {
    tooltipText,
    handleUpdateMultiExecutionResult,
    displayName,
    value = [],
    hideValidationMessage,
    validateMessage,
    maxFiles,
    minFiles,
    selectionType,
    customRule,
    required,
    allowAnonymousUse,
    updateComponentHeight,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    triggerEventHandler,
  } = props

  const appID = useSelector(getAppId)!
  const cameraButtonRef = useRef<HTMLButtonElement>(null)

  const uploadToDrive = useCallback(
    async (
      file: File,
      fileList: FileInfo[],
      abortController: AbortController,
      uploadParams: {
        folder: string
        allowAnonymous: boolean
        replace: boolean
      },
    ) => {
      let res: { id: string; name: string } | undefined
      try {
        res = await uploadFileToDrive(
          file,
          uploadParams,
          abortController.signal,
        )
      } catch (e) {
        handleCollaPurchaseError(e, CollarModalType.TRAFFIC, "CAMERA_WIDGET")
        const currentValue = fileList.map((item) => {
          if (item.fileName === file.name) {
            return {
              ...item,
              driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
            }
          } else return item
        })
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: currentValue,
            },
          },
        ])
      }
      if (res) {
        const currentValue = await handleGetValueAfterUpload(
          file.name,
          fileList,
          res.id,
        )
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: currentValue,
            },
          },
        ])
      } else {
        const currentValue = fileList.map((item) => {
          if (item.fileName === file.name) {
            return {
              ...item,
              driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
            }
          } else return item
        })
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: currentValue,
            },
          },
        ])
      }
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const handleUpload = async (file: File) => {
    const abortController = new AbortController()
    let needUpdateValue: FileInfo[] = []
    if (selectionType === "multiple") {
      needUpdateValue = [
        ...value,
        {
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING,
        },
      ]
    } else {
      needUpdateValue = [
        {
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING,
        },
      ]
    }

    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: needUpdateValue,
        },
      },
    ])

    const uploadParams = {
      folder: `${appID}/${FOLDER_NAME}`,
      allowAnonymous: !!allowAnonymousUse,
      replace: true,
    }
    UploadStore.addFile(file)
    uploadToDrive(file, needUpdateValue, abortController, uploadParams)
  }

  const handleRetry = async (file: File) => {
    const abortController = new AbortController()
    const uploadParams = {
      folder: `${appID}/${FOLDER_NAME}`,
      allowAnonymous: !!allowAnonymousUse,
      replace: true,
    }
    const needUpdateValue = value.map((item) => {
      if (item.fileName === file.name) {
        return {
          ...item,
          driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING,
        }
      } else return item
    })
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: needUpdateValue,
        },
      },
    ])
    uploadToDrive(file, needUpdateValue, abortController, uploadParams)
  }

  const handleDeleteFile = (fileName: string) => {
    const needUpdateValue = value.filter((item) => item.fileName !== fileName)
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: needUpdateValue,
        },
      },
    ])
    UploadStore.removeFile(fileName)
  }

  const triggerCapture = () => {
    triggerEventHandler("capture")
  }

  const getValidateMessage = useCallback(() => {
    if (!hideValidationMessage) {
      let message: string | undefined
      let validParams: ValidateCheckProps = {
        value,
        required,
        customRule,
      }
      if (selectionType === "multiple") {
        validParams = {
          ...validParams,
          minFiles,
          maxFiles,
        }
      }
      message = handleValidateCheck(validParams)
      const showMessage = message && message.length > 0
      return showMessage ? message : ""
    }
    return ""
  }, [
    customRule,
    hideValidationMessage,
    maxFiles,
    minFiles,
    required,
    selectionType,
    value,
  ])

  const handleValidate = useCallback(() => {
    const message = getValidateMessage()
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          validateMessage: message,
        },
      },
    ])
    return message
  }, [displayName, getValidateMessage, handleUpdateMultiExecutionResult])

  useEffect(() => {
    updateComponentRuntimeProps({
      setDisabled: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              disabled: true,
            },
          },
        ])
      },
      validate: () => {
        return handleValidate()
      },
      clearValidation: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              validateMessage: undefined,
            },
          },
        ])
      },
      clearValue: () => {
        UploadStore.clearFile()
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: [],
            },
          },
        ])
      },
      openCamera: () => {
        cameraButtonRef.current?.click()
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    handleValidate,
    updateComponentRuntimeProps,
  ])
  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={buttonLayoutStyle}>
          {isMobileByUserAgent() ? (
            <MobileCamera
              {...props}
              ref={cameraButtonRef}
              handleUpload={handleUpload}
              handleRetry={handleRetry}
              handleDeleteFile={handleDeleteFile}
              triggerCapture={triggerCapture}
            />
          ) : (
            <PcCamera
              {...props}
              ref={cameraButtonRef}
              handleUpload={handleUpload}
              handleRetry={handleRetry}
              handleDeleteFile={handleDeleteFile}
              triggerCapture={triggerCapture}
            />
          )}
        </div>
      </TooltipWrapper>
      {!hideValidationMessage && (
        <div>
          <InvalidMessage validateMessage={validateMessage} />
        </div>
      )}
    </AutoHeightContainer>
  )
}

CameraWidget.displayName = "CameraWidget"
export default CameraWidget
