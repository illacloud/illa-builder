import { CheckboxGroupProps } from "@illa-design/checkbox"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedCheckboxGroupProps
  extends Pick<
      CheckboxGroupProps,
      | "value"
      | "disabled"
      | "options"
      | "direction"
      | "defaultValue"
      | "colorScheme"
    >,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps {
  itemMode?: "dynamic" | "static"
  handleUpdateDsl: (value: Record<string, any>) => void
}
