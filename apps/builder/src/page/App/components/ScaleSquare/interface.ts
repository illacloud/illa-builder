import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export type ScaleSquareType = "error" | "normal" | "production"

export interface ScaleSquareProps {
  displayName: string
  unitW: number
  parentNodeDisplayName: string
  widgetType: string
  columnNumber: number
}

export interface ScaleSquarePropsWithJSON {
  componentNode: ComponentNode
  unitW: number
  columnNumber: number
  displayNamePrefix?: string
}
