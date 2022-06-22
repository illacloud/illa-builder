import { RadioGroupProps } from "@illa-design/radio"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"
import LabelProps from "@/wrappedComponents/Label/interface"

export interface WrappedRadioGroupProps
  extends Pick<
      RadioGroupProps<any>,
      "value" | "disabled" | "options" | "direction" | "colorScheme"
    >,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps {
  itemMode: "manual" | "mapped"
  handleUpdateDsl: (value: Record<string, any>) => void
}
