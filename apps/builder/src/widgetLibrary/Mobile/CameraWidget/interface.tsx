import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface FileInfo {
  fileName: string
  contentType: string
  size: number
  driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI
  tinyURL?: string
  fileID?: string
}

export enum CAMERA_MODE {
  PHOTO = "photo",
  VIDEO = "video",
}

export enum FACING_MODE {
  USER = "user",
  ENVIRONMENT = "environment",
}

export interface WrappedCameraProps {
  buttonText?: string
  inputMethod?: CAMERA_MODE
  facingMode?: FACING_MODE
  selectionType?: "single" | "multiple"
  loading?: boolean
  disabled?: boolean
  minFiles?: number
  maxFiles?: number
  minDuration?: number
  maxDuration?: number
  colorScheme?: string
  value?: FileInfo[]
  label?: string
  variant?: "fill" | "outline"
  handleUpload: (file: File) => void
  handleRetry: (file: File) => void
  handleDeleteFile: (fileName: string) => void
  triggerCapture: () => void
}

export interface CameraWidgetProps
  extends WrappedCameraProps,
    BaseWidgetProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  defaultValue: string
  validateMessage: string
}
