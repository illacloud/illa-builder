import { HTMLAttributes, ReactNode } from "react"
import { WidgetCardInfo } from "@/widgetLibrary/interface"
import { SessionType } from "@/widgetLibrary/componentListBuilder"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: ReactNode
  widgetCardInfos: WidgetCardInfo[]
}

export type NewTypeMapComponent = {
  [key in SessionType]: WidgetCardInfo[]
}

export interface ComponentItemProps extends WidgetCardInfo {}
