import { SelectProps } from "@illa-design/select"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

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
  prefixIcon?: string // TODO: not support yet
  suffixIcon?: string // TODO: not support yet
  prefixText?: string // TODO: not support yet
  suffixText?: string // TODO: not support yet
  handleUpdateDsl: (value: Record<string, any>) => void
  styles?: {
    colorScheme?: SelectProps["colorScheme"]
  }
}
