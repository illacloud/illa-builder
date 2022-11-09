import { ReactChild } from "react"

export interface LayoutOptionsPanelProps {
  selectedValue: string
  currentPageName: string
}

export interface LayoutSelectProps {
  value: string
  currentPageName: string
}

export interface LayoutOptionItemProps {
  isSelected: boolean
  label: string
  value: string
  icon: ReactChild
  selectedValue: string
  currentPageName: string
}
