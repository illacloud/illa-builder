import { RadioGroupProps } from "@illa-design/radio"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedSegmentedControlProps
  extends Pick<
      RadioGroupProps<any>,
      "value" | "disabled" | "options" | "direction"
    >,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps {
  styles?: {
    colorScheme?: RadioGroupProps<any>["colorScheme"]
  }
  handleUpdateDsl: (value: Record<string, any>) => void
}
