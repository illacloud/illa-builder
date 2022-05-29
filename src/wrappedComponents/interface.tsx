import { FC, ReactNode } from "react"
import { SessionType } from "./ComponentListBuilder"
import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"
import { WidgetType } from "@/wrappedComponents/WidgetBuilder"

export interface SizeProps {
  w?: number | string
  h?: number | string
}

export interface WidgetConfigs {
  [key: string]: {
    widget: FC<any>
    config: ComponentModel
    panelConfig: PanelConfig[]
  }
}

export type ComponentModel = {
  id?: string
  widgetName: string
  icon?: string | ReactNode // url
  type?: string // 组件类型
  version: string
  sessionType?: SessionType
  defaults?: {
    [key: string]: any
  }
}

export interface DragInfo extends DSLWidget {
  props: {
    [key: string]: any
  } & DSLWidget["props"]
}
