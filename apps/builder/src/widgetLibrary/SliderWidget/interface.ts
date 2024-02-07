import { SliderProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedSliderProps
  extends Omit<ValidateMessageOldProps, "value">,
    Pick<
      SliderProps,
      "value" | "min" | "max" | "step" | "disabled" | "colorScheme"
    > {
  hideOutput: boolean
  displayName: string
  validateMessage: string
  labelWrapping?: boolean
  prefixIcon?: string
  suffixIcon?: string
  required?: boolean
  handleOnChange: (value: number | number[]) => void
}

export interface SliderWidgetProps
  extends WrappedSliderProps,
    BaseWidgetProps,
    LabelProps,
    Omit<TooltipWrapperProps, "children"> {
  validateMessage: string
  value?: number
  defaultValue?: number
}
