export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface TextProps extends Pick<TooltipWrapperProps, "tooltipText"> {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  backgroundColor?: string // TODO: add colorScheme type
  textColor?: string // TODO: add colorScheme type
  linkColor?: string // TODO: add colorScheme type
  displayName?: string
  handleUpdateDsl: (value: Record<string, string | undefined>) => void
  handleUpdateGlobalData?: (key: string, value: any) => void
  handleDeleteGlobalData?: (key: string) => void
}
