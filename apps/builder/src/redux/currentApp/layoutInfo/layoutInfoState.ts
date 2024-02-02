import { CONTAINER_TYPE } from "@illa-public/public-types"
import { LayoutInfo } from "@/redux/currentApp/components/componentsPayload"

export interface WidgetLayoutInfo {
  displayName: string
  widgetType: string
  layoutInfo: LayoutInfo
  parentNode: string
  containerType: CONTAINER_TYPE
  childrenNode: string[]
}

export interface LayoutInfoState {
  widgetsLayoutInfo: Record<string, WidgetLayoutInfo>
}

export const layoutInfoInitialState: LayoutInfoState = {
  widgetsLayoutInfo: {},
}

export interface UpdateWidgetLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
  parentNode: string
  effectRows?: number
}

export interface BatchUpdateWidgetLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
}
