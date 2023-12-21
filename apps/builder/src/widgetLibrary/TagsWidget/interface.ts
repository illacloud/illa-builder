import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "../interface"

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
