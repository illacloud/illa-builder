import { FC, ReactNode } from "react"
import { NewSessionType } from "./ComponentListBuilder"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { WidgetType } from "@/wrappedComponents/WidgetBuilder"

export interface WidgetConfigs {
  [key: string]: {
    widget: FC<any>
    config: WidgetConfig
    panelConfig: PanelConfig[]
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
  sessionType?: NewSessionType
}

export interface WidgetCardInfo extends DraggableWrapperShape, BaseWidgetInfo {
  id: string
  childrenNode?: WidgetCardInfo[]
  defaults?: {
    [key: string]: any
  }
}

export type WidgetConfig = Omit<WidgetCardInfo, "id">

export interface BaseDSL
  extends DraggableWrapperShape,
    Omit<BaseWidgetInfo, "icon" | "sessionType" | "widgetName"> {
  id: string
  childrenNode?: BaseDSL[]
  props?: {
    [key: string]: any
  }
}

export interface EventsInProps {
  script: string
  eventType: string
  enabled?: string
}
