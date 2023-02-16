import { SelectProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedSelectProps
  extends Omit<ValidateMessageOldProps, "value">,
    Pick<
      SelectProps,
      | "options"
      | "value"
      | "placeholder"
      | "disabled"
      | "loading"
      | "readOnly"
      | "showSearch"
      | "colorScheme"
    > {
  showClear?: SelectProps["allowClear"]
  invalid?: boolean
  prefixIcon?: string // TODO: not support yet
  suffixIcon?: string // TODO: not support yet
  prefixText?: string // TODO: not support yet
  suffixText?: string // TODO: not support yet
  displayName: string
  handleUpdateDsl: (value: any) => void
  getValidateMessage: (value?: unknown) => string
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  handleOnChange?: () => void
  handleOnBlur?: () => void
  handleOnFocus?: () => void
}

export interface SelectWidgetProps
  extends WrappedSelectProps,
    BaseWidgetProps,
    LabelProps,
    Omit<TooltipWrapperProps, "children"> {
  optionConfigureMode?: "dynamic" | "static"
  manualOptions?: {
    label: string
    value: string | number
    disabled?: boolean
    extra?: any
  }[]
  mappedOption?: {
    labels: string[]
    values: any[]
    disables: boolean[]
  }
  validateMessage: string
  dataSources: unknown[]
}
