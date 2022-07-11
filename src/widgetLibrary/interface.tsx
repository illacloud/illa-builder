import { FC, ReactNode } from "react"
import { SessionType } from "./componentListBuilder"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { WidgetType } from "@/widgetLibrary/widgetBuilder"

export interface EventHandlerConfig {
  events: string[]
  methods: string[]
}

export interface WidgetConfigs {
  [key: string]: {
    widget: FC<any>
    config: WidgetConfig
    panelConfig: PanelConfig[]
    eventHandlerConfig?: EventHandlerConfig
  }
}

export interface DraggableWrapperShape {
  w: number
  h: number
}

export interface BaseWidgetInfo {
  displayName: string
  widgetName: string
  icon: ReactNode
  type: WidgetType
  sessionType?: SessionType
}

export interface WidgetCardInfo extends DraggableWrapperShape, BaseWidgetInfo {
  id: string
  childrenNode?: WidgetCardInfo[]
  defaults?: {
    [key: string]: any
  }
}

export type WidgetConfig = Omit<WidgetCardInfo, "id">

export interface EventsInProps {
  script: string
  eventType: string
  enabled?: string
}
