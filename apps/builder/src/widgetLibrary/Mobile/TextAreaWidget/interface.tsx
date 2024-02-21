import { TextAreaProps } from "antd-mobile"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTextareaProps
  extends Pick<
      TextAreaProps,
      "placeholder" | "disabled" | "readOnly" | "maxLength"
    >,
    BaseWidgetProps {
  showCharacterCount?: TextAreaProps["showCount"]
  value?: string
  handleOnChange: (value: string) => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
  maxLength?: number
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}

export interface TextareaWidgetProps
  extends WrappedTextareaProps,
    BaseWidgetProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value">,
    LabelProps {
  validateMessage: string
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  defaultValue?: string
}
