import { SwitchProps } from "@illa-design/switch"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "disabled" | "colorScheme">,
    Omit<ValidateMessageProps, "value"> {
  value?: SwitchProps["checked"]
  handleOnChange: () => void
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}

export interface SwitchWidgetProps
  extends WrappedSwitchProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}
