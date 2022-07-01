import { RadioGroupProps } from "@illa-design/radio"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"

export interface WrappedRadioGroupProps
  extends Pick<
      RadioGroupProps<any>,
      "value" | "disabled" | "options" | "direction"
    >,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps {
  itemMode?: "manual" | "mapped"
  handleUpdateDsl: (value: Record<string, any>) => void
  styles?: {
    colorScheme?: RadioGroupProps<any>["colorScheme"]
  }
}
