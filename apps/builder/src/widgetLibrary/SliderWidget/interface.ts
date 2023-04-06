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

export interface SliderWidgetProps
  extends WrappedSliderProps,
    BaseWidgetProps,
    LabelProps,
    Omit<TooltipWrapperProps, "children"> {
  validateMessage: string
}
