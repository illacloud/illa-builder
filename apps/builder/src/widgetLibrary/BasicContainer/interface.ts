import { ReactNode } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface BasicContainerProps {
  children?: ReactNode
  displayName: string
  columnNumber?: number
  displayNamePrefix?: string
}

export interface BasicContainerByJsonProps {
  children?: ReactNode
  columnNumber?: number
  displayNamePrefix?: string
  componentNode: ComponentNode
}
