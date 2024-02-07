import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseJsonEditorProps extends BaseWidgetProps {
  value?: string
  disabled?: boolean
  handleOnChange?: (value: string) => void
  handleOnBlur?: () => void
  handleOnFocus?: () => void
}

export interface JsonEditorWidgetProps
  extends BaseJsonEditorProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  defaultValue?: string
}
