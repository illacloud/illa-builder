import { ReactNode } from "react"

export interface PanelBarProps {
  title: string
  children?: ReactNode
  isOpened?: boolean
  isAddIcon?: boolean
  addAction?: () => void
  saveToggleState?: (value: boolean) => void
  onIllaFocus?: () => void
}
