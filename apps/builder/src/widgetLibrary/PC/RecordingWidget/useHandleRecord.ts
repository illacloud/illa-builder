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
  const [url, setUrl] = useState<string>()
  const startRecordFnRef = useRef<() => void>()
  const dataRecordFnRef = useRef<(e: BlobEvent) => void>()
  const stopRecordFnRef = useRef<() => void>()

  const handleButtonClick = useCallback(async () => {
    cancelTimer.current && cancelTimer.current()
    if (isRecording && recorder.current) {
      recorder.current.stop()
      handleUpdateStatus({ recordTime: parseFloat(recordingTime.toFixed(1)) })
      setIsRecording(false)
    } else {
      try {
        recorder.current = null
        stream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        const currentRecorder = new MediaRecorder(stream.current)
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
          if (stream.current) {
            await stream.current.getTracks().forEach((track) => track.stop())
          }
          const audioBlob = new Blob(chunks.current, {
            type: currentRecorder.mimeType,
          })
          const url = URL.createObjectURL(audioBlob)
          setUrl(url)
          var reader = new FileReader()
          reader.onload = function (e) {
            const data = e.target?.result
            if (data && typeof data === "string") {
              handleOnChange && handleOnChange(data || "")
            }
          }
          reader.readAsDataURL(audioBlob)
          if (recorder.current) {
            startRecordFnRef.current &&
              recorder.current.removeEventListener(
                "start",
                startRecordFnRef.current,
              )
            dataRecordFnRef.current &&
              recorder.current.removeEventListener(
                "dataavailable",
                dataRecordFnRef.current,
              )
            stopRecordFnRef.current &&
              recorder.current.removeEventListener(
                "stop",
                stopRecordFnRef.current,
              )
          }
          stream.current = null
          recorder.current = null
        }
        currentRecorder.addEventListener("start", startRecordFnRef.current)

        currentRecorder.addEventListener(
          "dataavailable",
          dataRecordFnRef.current,
        )

        currentRecorder.addEventListener("stop", stopRecordFnRef.current)

        currentRecorder.start()
        recorder.current = currentRecorder
        setIsRecording(true)
      } catch (error) {
        console.log(error)
      }
    }
  }, [handleOnChange, handleUpdateStatus, isRecording, recordingTime])

  const clearData = () => {
    chunks.current = []
    url && URL.revokeObjectURL(url)
    setUrl("")
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
        stream.current.getTracks()?.forEach((track) => track.stop())
      }
    }
  }, [stream, recorder])

  return {
    isRecording,
    url,
    recordingTime,
    handleButtonClick,
    clearData,
  }
}
