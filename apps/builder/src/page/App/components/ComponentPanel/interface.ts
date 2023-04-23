import { HTMLAttributes } from "react"
import { SessionType } from "@/widgetLibrary/componentListBuilder"
import { WidgetCardInfo } from "@/widgetLibrary/interface"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: any
  type: SessionType
  widgetCardInfos: WidgetCardInfo[]
}

export type NewTypeMapComponent = {
  [key in SessionType]: WidgetCardInfo[]
}

export interface ComponentItemProps extends WidgetCardInfo {}
