import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type Alignment = "flex-start" | "center" | "flex-end"
export interface WrappedTagsProps {
  width: number
  value?: string[]
  allowWrap?: boolean
  tagColor?: Record<string, string>
  alignment?: Alignment
  handleOnSelect?: (value: string) => void
}

export interface TagsWidgetProps
  extends WrappedTagsProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {
  disabled?: boolean
}
