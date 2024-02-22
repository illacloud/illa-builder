import { ChangeEvent, forwardRef, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Button, useMessage } from "@illa-design/react"
import {
  ACCEPT_MODE,
  DEFAULT_LABEL,
} from "@/widgetLibrary/Mobile/CameraWidget/constant"
import {
  CAMERA_MODE,
  FACING_MODE,
  WrappedCameraProps,
} from "@/widgetLibrary/Mobile/CameraWidget/interface"
import UploadFileList from "../UploadFileList"
import { containerStyle } from "./style"

const MobileCamera = forwardRef<HTMLButtonElement, WrappedCameraProps>(
  (
    {
      handleUpload,
      minDuration,
      maxDuration,
      facingMode = FACING_MODE.ENVIRONMENT,
      inputMethod = CAMERA_MODE.PHOTO,
      colorScheme,
      selectionType,
      maxFiles,
      value,
      label,
      loading,
      disabled,
      variant,
      buttonText,
      handleDeleteFile,
      handleRetry,
      triggerCapture,
    },
    ref,
  ) => {
    const message = useMessage()
    const { t } = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null)
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
      inputRef.current && inputRef.current.click()
    }

    const handleVideoFile = (file: File) => {
      const url = URL.createObjectURL(file)
      const videoElement = new Audio(url)
      videoElement.src = URL.createObjectURL(file)
      let duration
      videoElement.addEventListener("loadedmetadata", function (_event) {
        duration = videoElement.duration
        if (minDuration && duration < minDuration) {
          message.error({
            content: t("editor.inspect.setter_message.recording.min_duration", {
              minimum: minDuration,
            }),
          })
          URL.revokeObjectURL(url)
          return
        }
        if (maxDuration && duration > maxDuration) {
          message.error({
            content: t("editor.inspect.setter_message.recording.max_duration", {
              maximum: maxDuration,
            }),
          })
          URL.revokeObjectURL(url)
          return
        }
        handleUpload(file)
      })
    }

    const handleImageFile = (file: File) => {
      handleUpload(file)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      triggerCapture()
      if (files) {
        const file = files[0]
        switch (inputMethod) {
          case CAMERA_MODE.PHOTO:
            handleImageFile(file)
            break
          case CAMERA_MODE.VIDEO:
            handleVideoFile(file)
            break
        }
      }
    }

    return (
      <div css={containerStyle}>
        <Button
          onClick={handleClick}
          colorScheme={colorScheme}
          variant={variant}
          loading={loading}
          disabled={disabled}
          ref={ref}
        >
          {buttonText ?? DEFAULT_LABEL}
        </Button>
        {Array.isArray(value) && value.length > 0 && (
          <UploadFileList
            value={value}
            label={label}
            handleRetry={handleRetry}
            handleDeleteFile={handleDeleteFile}
          />
        )}
        <input
          style={{ display: "none" }}
          type="file"
          ref={inputRef}
          accept={ACCEPT_MODE[inputMethod]}
          capture={facingMode}
          onChange={handleFileChange}
        />
      </div>
    )
  },
)

MobileCamera.displayName = "MobileCamera"

export default MobileCamera
