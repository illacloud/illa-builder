import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseRichTextProps extends BaseWidgetProps {
  value?: string
  handleOnChange: (value: unknown) => void
  handleOnFocus: () => void
  handleOnBlur: () => void
}

export interface RichTextWidgetProps
  extends BaseRichTextProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}
