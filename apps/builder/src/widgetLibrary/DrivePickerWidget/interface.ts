import { EXPIRATION_TYPE } from "@illa-public/public-types"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDrivePickerProps extends BaseWidgetProps {
  allowAnonymousUse?: boolean
  ILLADriveFolder?: string
  generateSignedURL?: boolean
  expirationType?: EXPIRATION_TYPE
  expiredTime?: number
  useHotlink?: boolean
  text?: string
  selectionType?: "single" | "multiple"
  allowFileTypes?: string[]
  showFileList?: boolean
  minSize?: number
  maxSize?: number
  sizeType?: "kb" | "mb"
  minFileNum?: number
  maxFileNum?: number
  disabled?: boolean
  variant?: "text" | "light" | "fill" | "outline" | "dashed"
  colorScheme?: string
}

export interface DrivePickerWidgetProps
  extends WrappedDrivePickerProps,
    Pick<TooltipWrapperProps, "tooltipText"> {}

export interface SelectItemValue {
  fileURL: string
  tinyURL: string
  fileID: string
}
