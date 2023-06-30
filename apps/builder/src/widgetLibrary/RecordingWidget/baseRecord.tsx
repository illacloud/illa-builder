import { FC, useEffect, useRef, useState } from "react"
import { Button } from "@illa-design/react"
import { WrappedAudio } from "@/widgetLibrary/AudioWidget/audio"
import {
  DefaultClearText,
  DefaultStartText,
  DefaultStopText,
  RecordPermission,
} from "@/widgetLibrary/RecordingWidget/constants"
import { BaseAudioRecorder } from "@/widgetLibrary/RecordingWidget/interface"
import {
  applyContainerStyle,
  applyPreviewStyle,
  applyTextButtonStyle,
  audioContainerStyle,
} from "@/widgetLibrary/RecordingWidget/style"
import { useHandleRecord } from "@/widgetLibrary/RecordingWidget/useHandleRecord"
import { getsSafeNodeValue } from "@/widgetLibrary/RecordingWidget/utils"

export const BaseRecorder: FC<BaseAudioRecorder> = (props) => {
  const {
    value,
    loading = false,
    disabled = false,
    startText,
    stopText,
    clearText,
    colorScheme = "blue",
    handleUpdateStatus,
    handleOnChange,
  } = props
  const permissionStatus = useRef<PermissionStatus | null>()
  const [permissionDisabled, setPermissionDisabled] = useState<boolean>(true)

  const { isRecording, url, recordingTime, handleButtonClick, clearData } =
    useHandleRecord(handleUpdateStatus, handleOnChange)

  const emptyFun = () => undefined

  useEffect(() => {
    const handlePermissionChange = (event: Event) => {
      const result = event.target as PermissionStatus
      if (result.state === "granted" || result.state === "prompt") {
        handleUpdateStatus({ validateMessage: "" })
        setPermissionDisabled(false)
      } else if (result.state === "denied") {
        handleUpdateStatus({ validateMessage: RecordPermission })
        setPermissionDisabled(true)
      }
    }

    navigator?.permissions
      ?.query({ name: "microphone" as PermissionName })
      .then((status) => {
        permissionStatus.current = status
        if (status.state === "granted" || status.state === "prompt") {
          setPermissionDisabled(false)
        } else if (status.state === "denied") {
          handleUpdateStatus({
            validateMessage: RecordPermission,
          })
          setPermissionDisabled(true)
        }
        status.addEventListener("change", handlePermissionChange)
      })

    return () => {
      permissionStatus.current?.removeEventListener(
        "change",
        handlePermissionChange,
      )
    }
  }, [handleUpdateStatus])

  useEffect(() => {
    handleUpdateStatus({ isRecording })
  }, [handleUpdateStatus, isRecording])

  return (
    <div css={applyContainerStyle}>
      {!url && !value && (
        <Button
          onClick={handleButtonClick}
          disabled={permissionDisabled || disabled}
          loading={loading}
          colorScheme={colorScheme}
          size="large"
          w="100%"
        >
          {!isRecording
            ? getsSafeNodeValue(startText || DefaultStartText)
            : `${getsSafeNodeValue(
                stopText || DefaultStopText,
              )} ${recordingTime.toFixed(1)}s`}
        </Button>
      )}
      {(url || value) && !isRecording && (
        <div css={applyPreviewStyle}>
          <Button
            onClick={clearData}
            loading={loading}
            colorScheme="grayBlue"
            variant="text"
            css={applyTextButtonStyle}
          >
            {getsSafeNodeValue(clearText || DefaultClearText)}
          </Button>
          <div css={audioContainerStyle}>
            <WrappedAudio
              {...props}
              key={url}
              url={url || value}
              controls={true}
              onPlay={emptyFun}
              onPause={emptyFun}
              onEnded={emptyFun}
              onReady={emptyFun}
              onPlaybackRateChange={emptyFun}
            />
          </div>
        </div>
      )}
    </div>
  )
}
