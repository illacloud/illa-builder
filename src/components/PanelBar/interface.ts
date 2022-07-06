import { ReactNode } from "react"

export interface PanelBarProps {
  title: string
  children?: ReactNode
  isOpened?: boolean
  hasGhostEmpty?: boolean
  saveToggleState?: (value: boolean) => void
}
