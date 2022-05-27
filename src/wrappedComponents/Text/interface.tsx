export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"

export interface TextProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  backgroundColor?: string
  textColor?: string
  linkColor?: string
  tooltipText?: string
}
