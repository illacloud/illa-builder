import { SliderProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedRangeSliderProps
  extends Omit<ValidateMessageOldProps, "value">,
    Pick<
      SliderProps,
      "value" | "min" | "max" | "step" | "disabled" | "colorScheme"
    > {
  startValue: number
  endValue: number
  hideOutput: boolean
  displayName: string
  validateMessage: string
  labelWrapping?: boolean
  prefixIcon?: string
  suffixIcon?: string
  required?: boolean
  handleUpdateValue: (value: any) => void
  getValidateMessage: (value?: unknown) => string
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  handleOnChange?: () => void
}

export interface RangeSliderWidgetProps
  extends WrappedRangeSliderProps,
    BaseWidgetProps,
    LabelProps,
    Omit<TooltipWrapperProps, "children"> {
  validateMessage: string
}
