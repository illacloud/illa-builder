import { ComponentTreeNode } from "@illa-public/public-types"

export type ScaleSquareType = "error" | "normal" | "production"

export interface ScaleSquareProps {
  displayName: string
  unitW: number
  parentNodeDisplayName: string
  widgetType: string
  columnNumber: number
}

export interface ScaleSquarePropsWithJSON {
  componentNode: ComponentTreeNode
  unitW: number
  columnNumber: number
  displayNamePrefix?: string
}
