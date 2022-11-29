import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { TextProps as ILLATextProps } from "@illa-design/react"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"

export interface TextProps extends ILLATextProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
}

export interface TextWidgetProps
  extends TextProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
