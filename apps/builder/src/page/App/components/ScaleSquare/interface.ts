import { HTMLAttributes } from "react"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export type ScaleSquareType = "error" | "normal" | "production"

export interface ScaleSquareProps extends HTMLAttributes<HTMLDivElement> {
  componentNode: ComponentNode
  unitW: number
  unitH: number
  containerHeight: number
  containerPadding: number
  childrenNode: ComponentNode[]
  collisionEffect: Map<string, ComponentNode>
  blockColumns: number
}

export interface ScaleSquarePropsWithJSON {
  componentNode: ComponentNode
  h: number
  w: number
  x: number
  y: number
  unitW: number
  unitH: number
  blockColumns: number
}

export interface MoveBarProps {
  displayName: string
  isError: boolean
  maxWidth: number
  selected: boolean
  isEditor: boolean
  widgetTop: number
  widgetHeight: number
  containerHeight: number
  containerPadding: number
  widgetType: string
  userList: CollaboratorsInfo[]
}

export interface MoveBarPositionShape {
  direction: "top" | "bottom"
  position: number
}
