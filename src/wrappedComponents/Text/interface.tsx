export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"

export interface TextProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  backgroundColor?: string // TODO: add colorScheme type
  textColor?: string // TODO: add colorScheme type
  linkColor?: string // TODO: add colorScheme type
  tooltipText?: string
}
