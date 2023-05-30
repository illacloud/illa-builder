import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseJsonEditorProps extends BaseWidgetProps {
  value?: string
  handleOnChange?: (value: string) => void
  handleOnBlur?: () => void
  handleOnFocus?: () => void
}

export interface ICustomRef {
  focus: () => void
}
export interface JsonEditorWidgetProps
  extends BaseJsonEditorProps,
    Pick<TooltipWrapperProps, "tooltipText"> {}
