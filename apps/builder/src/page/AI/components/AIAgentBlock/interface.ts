import { ReactNode } from "react"

export interface AIAgentBlockProps {
  title: string
  tips?: string
  subTitle?: string | ReactNode
  children?: ReactNode
  subtitleTips?: string
  required?: boolean
}
