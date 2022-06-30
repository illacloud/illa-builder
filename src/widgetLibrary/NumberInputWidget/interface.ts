import { InputNumberProps } from "@illa-design/input-number"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedNumberInputProps
  extends Pick<
      InputNumberProps,
      | "value"
      | "placeholder"
      | "max"
      | "min"
      | "precision"
      | "disabled"
      | "readOnly"
      | "prefix"
      | "suffix"
    >,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps {
  openThousandSeparator?: boolean
  handleUpdateDsl: (value: Record<string, number | undefined>) => void
  loading?: boolean
}
