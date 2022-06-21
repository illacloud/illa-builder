import { SelectProps } from "@illa-design/select"
import LabelProps from "@/wrappedComponents/Label/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"

export interface WrappedSelectProps
  extends LabelProps,
  Omit<ValidateMessageProps, "value">,
  Pick<TooltipWrapperProps, "tooltipText">,
  Pick<
  SelectProps,
  | "options"
  | "value"
  | "placeholder"
  | "disabled"
  | "loading"
  | "readOnly"
  | "showSearch"
  | "inputValue"
  > {
  optionConfigureMode?: "dynamic" | "static"
  showClear?: SelectProps["allowClear"]
  invalid?: boolean
  prefixIcon?: string
  suffixIcon?: string
  prefixText?: string
  suffixText?: string
  handleUpdateDsl: (value: Record<string, any>) => void
}
