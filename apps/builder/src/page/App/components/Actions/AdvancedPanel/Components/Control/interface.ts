import { ReactNode } from "react"

export interface AdvancedPanelControlProps {
  title: string
  subtitle?: string
  children: ReactNode
  disabled?: boolean
}
