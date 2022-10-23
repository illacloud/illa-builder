import { InputNumberProps } from "@illa-design/input-number"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedNumberInputProps
  extends Pick<
    InputNumberProps,
    | "value"
    | "placeholder"
    | "max"
    | "min"
    | "precision"
    | "disabled"
    | "readOnly"
    | "prefix"
    | "suffix"
  > {
  openThousandSeparator?: boolean
  loading?: boolean
  colorScheme?: InputNumberProps["borderColor"]
  handleUpdateDsl: (value: any) => void
}

export interface NumberInputWidgetProps
  extends WrappedNumberInputProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    ValidateMessageOldProps {
  validateMessage: string
}
