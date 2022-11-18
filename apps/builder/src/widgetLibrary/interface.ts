import { FC, ReactNode } from "react"
import { SessionType } from "./componentListBuilder"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { WidgetType } from "@/widgetLibrary/widgetBuilder"
import {
  ComponentNode,
  CONTAINER_TYPE,
} from "@/redux/currentApp/editor/components/componentsState"

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
  }
}

export interface DraggableWrapperShape {
  w: number
  h: number
  x?: number
  y?: number
}
export enum RESIZE_DIRECTION {
  "ALL" = "ALL",
  "HORIZONTAL" = "HORIZONTAL",
  "VERTICAL" = "VERTICAL",
}

export interface BaseWidgetInfo {
  displayName: string
  widgetName: any
  icon: ReactNode
  type: WidgetType
  containerType?: CONTAINER_TYPE
  sessionType?: SessionType
  keywords?: string[]
  resizeDirection?: RESIZE_DIRECTION
}
type defaultsType = () => Record<string, any>
export interface WidgetCardInfo extends DraggableWrapperShape, BaseWidgetInfo {
  id: string
  childrenNode?: Omit<WidgetConfig, "icon" | "keywords" | "sessionType">[]
  defaults?: defaultsType | Record<string, any>
}

export type WidgetConfig = Omit<WidgetCardInfo, "id">

export interface EventsInProps {
  script: string
  eventType: string
  enabled?: string
}

export interface BaseWidgetProps {
  displayName: string
  childrenNode: ComponentNode[]
  handleUpdateGlobalData: (key: string, value: any) => void
  handleDeleteGlobalData: (key: string) => void
  handleUpdateDsl: (value: any) => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  updateComponentHeight: (newHeight: number) => void
}

export interface BaseComponentNodeProps {
  w: number
  h: number
  unitW: number
  unitH: number
}
