import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseAudioRecorder extends BaseWidgetProps {
  value?: string
  data?: string
  isRecording?: boolean
  loading?: boolean
  disabled?: boolean
  startText?: string
  stopText?: string
  clearText?: string
  minDuration?: number
  maxDuration?: number
  colorScheme?: string
  recordTime?: number
  updateRecordTime: (time: number) => void
  updateRecording: (status: boolean) => void
  handleUpdateStatus: (value: Record<string, any>) => void
  handleOnChange?: (value: string) => void
}

export interface WrappedAudioRecorderProps extends BaseAudioRecorder {}

export interface AudioRecorderWidgetProps
  extends WrappedAudioRecorderProps,
    Omit<TooltipWrapperProps, "children">,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
