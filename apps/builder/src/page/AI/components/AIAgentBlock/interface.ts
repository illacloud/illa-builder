import { ReactNode } from "react"

export interface AIAgentBlockProps {
  title: string
  subTitle?: string | ReactNode
  children?: ReactNode
  tips?: string
  required?: boolean
}
