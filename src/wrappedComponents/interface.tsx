import { FC, ReactNode } from "react"
import { SessionType } from "./ComponentListBuilder"
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
  icon: ReactNode
  type: WidgetType
  sessionType?: SessionType
}

export interface CardInfo extends DraggableWrapperShape, BaseWidgetInfo {
  id: string
  defaults?: {
    [key: string]: any
  }
}

export type WidgetConfig = Omit<CardInfo, "id">

export interface BaseDSL
  extends DraggableWrapperShape,
    Omit<BaseWidgetInfo, "icon" | "sessionType"> {
  id: string
  childrenNode?: BaseDSL[]
  props?: {
    [key: string]: any
  }
}
