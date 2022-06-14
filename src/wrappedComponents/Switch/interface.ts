import LabelProps from "@/wrappedComponents/Label/interface"
import { SwitchProps } from "@illa-design/switch"

export interface WrappedSwitchProps
  extends Pick<SwitchProps, "checked" | "disabled" | "colorScheme">,
    LabelProps {
  required?: boolean
  tooltipText?: string
  handleOnChange: () => void
  handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
}
