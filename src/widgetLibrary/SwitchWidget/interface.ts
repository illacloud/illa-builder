import { SwitchProps } from "@illa-design/switch"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "disabled">,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps,
    Omit<ValidateMessageProps, "value"> {
  value?: SwitchProps["checked"]
  handleOnChange: () => void
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
  styles?: {
    colorScheme?: SwitchProps["colorScheme"]
  }
}
