import { SelectProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedMultiselectProps
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

export interface MultiselectWidgetProps
  extends WrappedMultiselectProps,
    BaseWidgetProps,
    LabelProps,
    Omit<TooltipWrapperProps, "children"> {
  validateMessage: string
  dataSources: unknown[]
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  atLeastNumber?: number
  upToNumber?: number
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
}
