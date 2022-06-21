import { RadioGroupProps } from "@illa-design/radio"
import LabelProps from "@/wrappedComponents/Label/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export interface WrappedSegmentedControlProps
  extends Pick<
  RadioGroupProps<any>,
  "value" | "disabled" | "options" | "direction" | "colorScheme"
  >,
  Pick<TooltipWrapperProps, "tooltipText">,
  LabelProps {
  handleUpdateDsl: (value: Record<string, any>) => void
}
