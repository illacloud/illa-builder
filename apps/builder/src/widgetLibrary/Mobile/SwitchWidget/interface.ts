import { SwitchProps } from "antd-mobile"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "disabled">,
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
