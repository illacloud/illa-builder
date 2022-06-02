import { HTMLAttributes } from "react"
import { WidgetCardInfo } from "@/wrappedComponents/interface"
import { SessionType } from "@/wrappedComponents/ComponentListBuilder"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: string
  children: WidgetCardInfo[]
}

export type TypeMapComponent = {
  [key in SessionType]: WidgetCardInfo[]
}

export interface ComponentItemProps extends WidgetCardInfo {}
