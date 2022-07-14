import { UploadProps } from "@illa-design/upload"
// import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedUploadProps extends UploadProps {
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}

export interface UploadWidgetProps extends WrappedUploadProps, BaseWidgetProps {
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}
