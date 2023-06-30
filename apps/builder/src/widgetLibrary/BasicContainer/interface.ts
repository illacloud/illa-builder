import { ReactNode } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface BasicContainerProps {
  children?: ReactNode
  minHeight?: number
  displayName: string
  columnNumber?: number
  displayNamePrefix?: string
}

export interface BasicContainerByJsonProps {
  children?: ReactNode
  minHeight?: number
  columnNumber?: number
  displayNamePrefix?: string
  componentNode: ComponentNode
}
