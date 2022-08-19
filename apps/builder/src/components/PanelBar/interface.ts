import { ReactNode } from "react"

export interface PanelBarProps {
  title: string
  children?: ReactNode
  isOpened?: boolean
  saveToggleState?: (value: boolean) => void
}
