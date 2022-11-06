import { ReactChild } from "react"

export interface LayoutOptionsPanelProps {
  selectedValue: string
}

export interface LayoutSelectProps {
  value: string
}

export interface LayoutOptionItemProps {
  isSelected: boolean
  label: string
  value: string
  icon: ReactChild
  selectedValue: string
}
