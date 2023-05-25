import { useCallback, useEffect, useRef, useState } from "react"
import { setInternalByTimeout } from "./utils"

export const useHandleRecord = (
  handleUpdateStatus: (value: Record<string, any>) => void,
  handleOnChange: ((value: string) => void) | undefined,
) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const startTime = useRef<number | undefined>()
  const [recordingTime, setRecordingTime] = useState<number>(0)
  const cancelTimer = useRef<() => void>()
  const chunks = useRef<Blob[]>([])
  const recorder = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const [data, setData] = useState<string>()

  const handleButtonClick = useCallback(async () => {
    cancelTimer.current && cancelTimer.current()
    if (isRecording && recorder.current) {
      recorder.current.stop()
      handleUpdateStatus({ recordTime: parseFloat(recordingTime.toFixed(1)) })
      setIsRecording(false)
    } else {
      try {
        stream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        const currentRecorder = new MediaRecorder(stream.current)

        currentRecorder.addEventListener("start", () => {
          startTime.current = window.performance.now()
          cancelTimer.current = setInternalByTimeout(() => {
            const now = window.performance.now()
            const value = (now - (startTime.current as number)) / 1000
            setRecordingTime(value)
          }, 100)
        })

        currentRecorder.addEventListener("dataavailable", (e) => {
          chunks.current.push(e.data)
        })

        currentRecorder.addEventListener("stop", () => {
          if (stream.current) {
            stream.current.getTracks().forEach((track) => track.stop())
          }
          const audioBlob = new Blob(chunks.current, {
            type: currentRecorder.mimeType,
          })
          var reader = new FileReader()
          reader.onload = function (e) {
            const data = e.target?.result
            if (data && typeof data === "string") {
              setData(data as string)
              handleOnChange && handleOnChange(data || "")
            }
          }
          reader.readAsDataURL(audioBlob)
        })

        currentRecorder.start()
        recorder.current = currentRecorder
        setIsRecording(true)
      } catch (error) {
        console.log(error)
      }
    }
  }, [handleOnChange, handleUpdateStatus, isRecording, recordingTime])

  const clearData = () => {
    setData("")
    setRecordingTime(0)
    handleUpdateStatus({ recordTime: 0 })
    handleOnChange && handleOnChange("")
  }

  useEffect(() => {
    return () => {
      cancelTimer.current && cancelTimer.current()
      if (recorder.current && recorder.current.state !== "inactive") {
        recorder.current.stop()
      }
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream, recorder])

  return {
    isRecording,
    data,
    recordingTime,
    handleButtonClick,
    clearData,
  }
}
