import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { SwitchProps } from "@illa-design/react"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "disabled" | "colorScheme">,
    Omit<ValidateMessageOldProps, "value"> {
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
  validateMessage: string
}
