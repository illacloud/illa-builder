import { AnimatePresence } from "framer-motion"
import { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, useMessage } from "@illa-design/react"
import { DEFAULT_BUTTON_TEXT } from "@/widgetLibrary/Mobile/CameraWidget/constant"
import { WrappedCameraProps } from "@/widgetLibrary/Mobile/CameraWidget/interface"
import UploadFileList from "../UploadFileList"
import CameraModal from "./CameraModal"

const PcCamera = forwardRef<HTMLButtonElement, WrappedCameraProps>(
  (
    {
      inputMethod,
      facingMode,
      value,
      variant,
      label,
      colorScheme,
      handleUpload,
      handleRetry,
      handleDeleteFile,
      minDuration,
      maxDuration,
      maxFiles,
      selectionType,
      loading,
      disabled,
      buttonText,
      triggerCapture,
    },
    ref,
  ) => {
    const [showCamera, setShowCamera] = useState(false)
    const message = useMessage()
    const { t } = useTranslation()

    const handleCancel = () => {
      setShowCamera(false)
    }
    const handleClick = () => {
      if (selectionType === "multiple") {
        if (maxFiles && Array.isArray(value) && value.length >= maxFiles) {
          return message.error({
            content: t("editor.validate_message.max_files", {
              maxFiles,
            }),
          })
        }
      }
      setShowCamera(true)
    }
    return (
      <>
        <Button
          ref={ref}
          size="large"
          w="100%"
          variant={variant}
          colorScheme={colorScheme}
          onClick={handleClick}
          loading={loading}
          disabled={disabled}
        >
          {buttonText ?? DEFAULT_BUTTON_TEXT}
        </Button>
        {Array.isArray(value) && value.length > 0 && (
          <UploadFileList
            value={value}
            label={label}
            handleRetry={handleRetry}
            handleDeleteFile={handleDeleteFile}
          />
        )}
        <AnimatePresence>
          {showCamera && (
            <CameraModal
              onCancel={handleCancel}
              inputMethod={inputMethod}
              facingMode={facingMode}
              handleUpload={handleUpload}
              minDuration={minDuration}
              maxDuration={maxDuration}
              triggerCapture={triggerCapture}
            />
          )}
        </AnimatePresence>
      </>
    )
  },
)

PcCamera.displayName = "PcCamera"

export default PcCamera
