import { FC, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import Webcam from "react-webcam"
import { v4 } from "uuid"
import { Button, Modal, useMessage } from "@illa-design/react"
import { RATIO } from "@/widgetLibrary/Mobile/CameraWidget/constant"
import {
  CAMERA_MODE,
  WrappedCameraProps,
} from "@/widgetLibrary/Mobile/CameraWidget/interface"
import { setInternalByTimeout } from "@/widgetLibrary/Mobile/CameraWidget/utils"
import { dataURLtoFile } from "@/widgetLibrary/PC/UploadWidget/util"
import CameraHandle from "./Handler"
import Preview from "./Preview"
import {
  cancelStyle,
  contentStyle,
  countdownStyle,
  headerStyle,
  modalContentStyle,
  modalStyle,
  noPermissionStyle,
  videoContainerStyle,
  videoStyle,
} from "./style"

interface CameraModalProps
  extends Pick<
    WrappedCameraProps,
    | "handleUpload"
    | "inputMethod"
    | "minDuration"
    | "maxDuration"
    | "triggerCapture"
    | "facingMode"
  > {
  onCancel: () => void
}

const CameraModal: FC<CameraModalProps> = ({
  onCancel,
  inputMethod,
  facingMode,
  handleUpload,
  minDuration,
  maxDuration,
  triggerCapture,
}) => {
  const { t } = useTranslation()
  const message = useMessage()
  const webcamRef = useRef<Webcam | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>()
  const [capturing, setCapturing] = useState(false)
  const chunks = useRef<Blob[]>([])
  const [showError, setShowError] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [showNext, setShowNext] = useState(false)
  const fileName = useRef("")
  const startRecordFnRef = useRef<() => void>()
  const startTime = useRef<number | undefined>()
  const cancelTimer = useRef<() => void>()
  const dataRecordFnRef = useRef<(e: BlobEvent) => void>()
  const stopRecordFnRef = useRef<() => void>()
  const [recordingTime, setRecordingTime] = useState<number>(0)
  const [showOperateBtn, setShowOperateBtn] = useState(false)

  const reset = () => {
    capturing && setCapturing(false)
    chunks.current.length > 0 && (chunks.current = [])
    setShowNext(false)
    previewUrl && URL.revokeObjectURL(previewUrl)
    setPreviewUrl("")
    fileName.current && (fileName.current = "")
    recordingTime && setRecordingTime(0)
  }

  const handleCancel = () => {
    if (showNext) {
      reset()
    } else {
      onCancel()
    }
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot()
    if (!imageSrc) return
    triggerCapture()
    fileName.current = `${v4()}.webp`
    const file = dataURLtoFile(imageSrc, fileName.current)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setShowNext(true)
  }, [triggerCapture])

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      })
      startRecordFnRef.current = () => {
        startTime.current = window.performance.now()
        cancelTimer.current = setInternalByTimeout(() => {
          const now = window.performance.now()
          const value = (now - (startTime.current as number)) / 1000
          setRecordingTime(value)
        }, 100)
      }
      dataRecordFnRef.current = (e) => {
        chunks.current.push(e.data)
      }
      stopRecordFnRef.current = async () => {
        if (chunks.current.length) {
          fileName.current = `${v4()}.webm`
          const blob = new Blob(chunks.current, {
            type: "video/webm",
          })
          const file = new File([blob], fileName.current, { type: blob.type })
          const url = URL.createObjectURL(file)
          startTime.current = undefined
          setPreviewUrl(url)
          setShowNext(true)
          chunks.current = []
        }
        if (mediaRecorderRef.current) {
          startRecordFnRef.current &&
            mediaRecorderRef.current.removeEventListener(
              "start",
              startRecordFnRef.current,
            )
          dataRecordFnRef.current &&
            mediaRecorderRef.current.removeEventListener(
              "dataavailable",
              dataRecordFnRef.current,
            )
          stopRecordFnRef.current &&
            mediaRecorderRef.current.removeEventListener(
              "stop",
              stopRecordFnRef.current,
            )
        }
        mediaRecorderRef.current = null
      }
      mediaRecorderRef.current.addEventListener(
        "start",
        startRecordFnRef.current,
      )

      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        dataRecordFnRef.current,
      )

      mediaRecorderRef.current.addEventListener("stop", stopRecordFnRef.current)
      mediaRecorderRef.current.start()
    }
  }, [])

  const handleStopCaptureClick = useCallback(() => {
    triggerCapture()
    mediaRecorderRef.current?.stop()
    cancelTimer.current && cancelTimer.current()
    setCapturing(false)
  }, [triggerCapture])

  const handleCameraClick = () => {
    if (inputMethod === CAMERA_MODE.PHOTO) {
      capture()
    } else if (!capturing) {
      handleStartCaptureClick()
    } else {
      handleStopCaptureClick()
    }
  }

  const handleNextClick = async () => {
    if (inputMethod === CAMERA_MODE.VIDEO) {
      if (minDuration && recordingTime < minDuration) {
        message.error({
          content: t("editor.inspect.setter_message.recording.min_duration", {
            minimum: minDuration,
          }),
        })
        handleCancel()
        return
      }
      if (maxDuration && recordingTime > maxDuration) {
        message.error({
          content: t("editor.inspect.setter_message.recording.max_duration", {
            maximum: maxDuration,
          }),
        })
        handleCancel()
        return
      }
    }
    const resp = await fetch(previewUrl)
    const blob = await resp.blob()
    const file = new File([blob], fileName.current, { type: blob.type })
    previewUrl && URL.revokeObjectURL(previewUrl)
    handleUpload(file)
    setPreviewUrl("")
    onCancel()
    fileName.current = ""
  }

  useEffect(() => {
    return () => {
      cancelTimer.current && cancelTimer.current()
    }
  }, [])

  return createPortal(
    <Modal
      visible
      _css={modalStyle}
      footer={false}
      closable={false}
      mask={false}
      modalContentStyle={modalContentStyle}
      withoutPadding
    >
      <div css={contentStyle}>
        <div css={headerStyle}>
          <span css={cancelStyle} onClick={handleCancel}>
            {t("widget.camera.operation.cancel")}
          </span>
          {showNext && (
            <Button colorScheme="white" onClick={handleNextClick}>
              {t("widget.camera.operation.ok")}
            </Button>
          )}
        </div>
        {showError ? (
          <div css={noPermissionStyle}>
            <span>
              {t("editor.inspect.setter_message.camera.permission_error")}
            </span>
          </div>
        ) : !showNext ? (
          <div css={videoContainerStyle}>
            {inputMethod === CAMERA_MODE.VIDEO && capturing && (
              <span css={countdownStyle}>{`${recordingTime.toFixed(1)}s`}</span>
            )}
            <Webcam
              audio={inputMethod === CAMERA_MODE.VIDEO}
              ref={webcamRef}
              css={videoStyle}
              screenshotFormat="image/webp"
              videoConstraints={{
                aspectRatio: RATIO,
                facingMode,
              }}
              onUserMedia={() => {
                setShowOperateBtn(true)
              }}
              onUserMediaError={() => {
                setShowError(true)
              }}
            />
            {showOperateBtn && (
              <CameraHandle
                inputMethod={inputMethod}
                capturing={capturing}
                handleClick={handleCameraClick}
              />
            )}
          </div>
        ) : (
          <Preview url={previewUrl} inputMethod={inputMethod} />
        )}
      </div>
    </Modal>,
    document.querySelector("[data-mobile-fullscreen-container=true]")!,
  )
}
export default CameraModal
