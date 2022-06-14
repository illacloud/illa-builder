import { HTMLAttributes, ReactNode } from "react"
import { WidgetCardInfo } from "@/wrappedComponents/interface"
import { NewSessionType } from "@/wrappedComponents/ComponentListBuilder"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: ReactNode
  children: WidgetCardInfo[]
}

export type NewTypeMapComponent = {
  [key in NewSessionType]: WidgetCardInfo[]
}

export interface ComponentItemProps extends WidgetCardInfo {}
