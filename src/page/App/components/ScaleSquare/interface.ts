import { HTMLAttributes } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export type ScaleSquareType = "error" | "normal"

export interface ScaleSquareProps extends HTMLAttributes<HTMLDivElement> {
  componentNode: ComponentNode
  h: number
  w: number
}
