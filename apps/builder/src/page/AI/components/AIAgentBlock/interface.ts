import { ReactNode } from "react"

export interface AIAgentBlockProps {
  title: string
  tips?: string
  subtitle?: string | ReactNode
  children?: ReactNode
  subtitleTips?: string
  required?: boolean
  scrollId?: string
}
