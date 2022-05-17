export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "top" | "center" | "bottom"

export interface TextProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  backgroundColor?: string
  textColor?: string
  linkColor?: string
}
