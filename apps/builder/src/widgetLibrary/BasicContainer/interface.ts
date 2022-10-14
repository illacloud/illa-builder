import { ReactNode } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
export interface BasicContainerProps {
  children?: ReactNode
  componentNode: ComponentNode
}
