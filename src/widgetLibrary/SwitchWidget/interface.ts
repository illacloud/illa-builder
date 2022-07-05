import { SwitchProps } from "@illa-design/switch"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "disabled" | "colorScheme">,
    Omit<ValidateMessageProps, "value"> {
  value?: SwitchProps["checked"]
  handleOnChange: () => void
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}
