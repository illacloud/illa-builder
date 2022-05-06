import { HTMLAttributes } from "react"
import { SizeProps } from "../interface"

export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "top" | "center" | "bottom"

export interface TextProps extends HTMLAttributes<HTMLDivElement>, SizeProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  backgroundColor?: string
  textColor?: string
  linkColor?: string
}
