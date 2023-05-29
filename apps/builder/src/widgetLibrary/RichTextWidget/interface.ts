import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseRichTextProps extends BaseWidgetProps {
  defaultText?: string
  handleOnChange: (value: unknown) => void
}

export interface RichTextWidgetProps
  extends BaseRichTextProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}

export interface ICustomRef {
  focus: () => void
}
