import { SwitchProps } from "@illa-design/switch"
import LabelProps from "@/wrappedComponents/Label/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "disabled" | "colorScheme">,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps,
    Omit<ValidateMessageProps, "value"> {
  value: SwitchProps["checked"]
  handleOnChange: () => void
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}
