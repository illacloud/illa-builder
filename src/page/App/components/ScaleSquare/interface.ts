import { HTMLAttributes } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ScaleSquareProps extends HTMLAttributes<HTMLDivElement> {
  componentNode: ComponentNode
}
