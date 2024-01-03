import { CONTAINER_TYPE } from "@illa-public/public-types"
import { FC, ReactNode } from "react"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { WidgetType } from "@/widgetLibrary/widgetBuilder"
import { SessionType } from "../page/App/components/ComponentPanel/componentListBuilder"

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
  minW?: number
  minH?: number
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
  version: number
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
  childrenNode: string[]
  handleUpdateDsl: (value: any) => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  updateComponentHeight: (newHeight: number) => void
  handleUpdateOriginalDSLMultiAttr: (
    updateSlice: Record<string, any>,
    notUseUndoRedo?: boolean,
  ) => void
  handleUpdateOriginalDSLOtherMultiAttr: (
    displayName: string,
    updateSlice: Record<string, any>,
    notUseUndoRedo?: boolean,
  ) => void
  triggerEventHandler: (
    eventType: string,
    path?: string,
    otherCalcContext?: Record<string, any>,
    formatPath?: (path: string) => string,
  ) => void
  triggerMappedEventHandler: (
    eventType: string,
    path: string,
    index?: number,
    formatPath?: (path: string) => string,
    isMapped?: (dynamicString: string, calcValue: unknown) => boolean,
  ) => void
  w: number
  h: number
  unitW: number
  unitH: number
  updateComponentRuntimeProps: (runtimeProps: unknown) => void
  deleteComponentRuntimeProps: () => void
}

export interface BaseComponentNodeProps {
  w: number
  h: number
  unitW: number
  unitH: number
}
