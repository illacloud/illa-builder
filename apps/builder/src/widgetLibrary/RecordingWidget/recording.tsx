import { FC, forwardRef, useCallback, useEffect } from "react"
import { useMessage } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { BaseRecorder } from "@/widgetLibrary/RecordingWidget/baseRecord"
import {
  AudioRecorderWidgetProps,
  WrappedAudioRecorderProps,
} from "@/widgetLibrary/RecordingWidget/interface"
import { getDataFromVal } from "@/widgetLibrary/RecordingWidget/utils"

export const WrappedRecording = forwardRef<
  HTMLDivElement,
  WrappedAudioRecorderProps
>((props, ref) => {
  return (
    <div ref={ref}>
      <BaseRecorder {...props} />
    </div>
  )
})

WrappedRecording.displayName = "WrappedRecording"

export const RecordingWidget: FC<AudioRecorderWidgetProps> = (props) => {
  const {
    displayName,
    minDuration,
    maxDuration,
    required,
    value,
    isRecording,
    recordTime,
    tooltipText,
    customRule,
    hideValidationMessage,
    validateMessage,
    triggerEventHandler,
    updateComponentHeight,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const messageModal = useMessage()

  const getValidateMessage = useCallback(() => {
    if (!hideValidationMessage) {
      let message: string | undefined
      if (value && !recordTime) {
        message = handleValidateCheck({
          value,
          customRule,
        })
      } else if (!value && !recordTime) {
        message = handleValidateCheck({
          value: undefined,
          required,
          customRule,
        })
      } else {
        message = handleValidateCheck({
          value: recordTime,
          required,
          maxDuration: maxDuration ?? 10000,
          minDuration: minDuration ?? 0,
          customRule,
        })
      }
      const showMessage = message && message.length > 0
      return showMessage ? message : ""
    }
    return ""
  }, [
    customRule,
    hideValidationMessage,
    maxDuration,
    minDuration,
    recordTime,
    required,
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

  const handleOnChange = useCallback(
    (value: string) => {
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: getDataFromVal(value),
              dataURI: value,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler("change")
      })
    },
    [displayName, handleUpdateMultiExecutionResult, triggerEventHandler],
  )

  const handleUpdateStatus = useCallback(
    (value: Record<string, number | string>) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value,
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  useEffect(() => {
    updateComponentRuntimeProps({
      clearValue: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: undefined,
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
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleValidate,
    handleUpdateMultiExecutionResult,
    displayName,
    value,
    recordTime,
    isRecording,
    messageModal,
  ])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <WrappedRecording
          {...props}
          handleOnChange={handleOnChange}
          handleUpdateStatus={handleUpdateStatus}
          handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
        />
      </TooltipWrapper>
      {!hideValidationMessage && (
        <div>
          <InvalidMessage validateMessage={validateMessage} />
        </div>
      )}
    </AutoHeightContainer>
  )
}
RecordingWidget.displayName = "RecordingWidget"
export default RecordingWidget
