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

export interface WidgetCardInfo extends DraggableWrapperShape, BaseWidgetInfo {
  childrenNode?: WidgetCardInfo[]
  defaults?: {
    [key: string]: any
  }
}

export type WidgetConfig = Omit<WidgetCardInfo, "id">

export interface BaseDSL
  extends DraggableWrapperShape,
    Omit<BaseWidgetInfo, "icon" | "sessionType"> {
  parentNode?: BaseDSL
  childrenNode?: BaseDSL[]
  props?: {
    [key: string]: any
  }
}
