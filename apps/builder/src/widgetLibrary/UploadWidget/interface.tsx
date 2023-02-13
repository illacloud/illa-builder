import { UploadItem, UploadProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedUploadProps
  extends Pick<
      UploadProps,
      | "disabled"
      | "onChange"
      | "onRemove"
      | "variant"
      | "loading"
      | "text"
      | "colorScheme"
    >,
    BaseWidgetProps {
  type: "button" | "dropzone"
  buttonText?: string
  dropText?: string
  fileType?: string[]
  selectionType?: "single" | "multiple" | "directory"
  appendFiles?: boolean
  showFileList?: boolean
  parseValue?: boolean
  minFiles?: number
  maxFiles?: number
  maxSize?: number
  minSize?: number
  minSizeType?: string
  maxSizeType?: string
  fileList?: UploadItem[]
  getValidateMessage: (value: UploadItem[]) => string
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}

export interface UploadWidgetProps
  extends WrappedUploadProps,
    BaseWidgetProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  fileList?: UploadItem[]
  displayName: string
  validateMessage: string
}
