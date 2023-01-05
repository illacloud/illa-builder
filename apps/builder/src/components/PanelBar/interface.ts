import { ReactNode } from "react"

export interface PanelBarProps {
  title: string
  size?: "default" | "small"
  children?: ReactNode
  isOpened?: boolean
  isAddIcon?: boolean
  addAction?: () => void
  saveToggleState?: (value: boolean) => void
  onIllaFocus?: () => void
}
