import { FC, ReactNode } from "react"
import { SessionType } from "./componentListBuilder"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { WidgetType } from "@/widgetLibrary/widgetBuilder"

export interface EventHandlerConfig {
  events: {
    label: string
    value: string
  }[]
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
  widgetName: any
  icon: ReactNode
  type: WidgetType
  sessionType?: SessionType
  keywords?: string[]
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

export interface BaseWidgetProps {
  displayName: string
  handleUpdateGlobalData: (key: string, value: any) => void
  handleDeleteGlobalData: (key: string) => void
  handleUpdateDsl: (value: any) => void
  updateComponentHeight: (newHeight: number) => void
}

export interface BaseComponentNodeProps {
  w: number
  h: number
  unitW: number
  unitH: number
}
