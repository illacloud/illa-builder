import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"
import { NotificationType } from "@illa-design/notification"

export interface EventHandlerSetterProps extends BaseSetter, PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
}

export interface EventHandlerSetterHeaderProps
  extends Partial<PanelLabelProps> {
  events: BaseEventItem[]
  handleAddItemAsync: (event: BaseEventItem) => Promise<void>
}

export type MethodType =
  | "trigger"
  | "run"
  | "openUrl"
  | "showNotification"
  | "setValue"
  | string

export type EventType =
  | "datasource"
  | "widget"
  | "script"
  | "state"
  | "openUrl"
  | "showNotification"

export interface BaseEventItem {
  id: string
  event: string
  method: MethodType
  targetId: string
  type: EventType
  enabled?: string
  waitMs: number
  waitType: string
}

export interface DataSourceEventItem extends BaseEventItem {
  type: "datasource"
}

export interface WidgetEventItem extends BaseEventItem {
  type: "widget"
}

export interface ScriptEventItem extends BaseEventItem {
  type: "script"
  script: string
}

export interface StateEventItem extends BaseEventItem {
  type: "state"
  stateValue: string
}

export interface OpenUrlEventItem extends BaseEventItem {
  type: "openUrl"
  url: string
  newTab: boolean | string
}

export interface ShowNotificationEventItem extends BaseEventItem {
  type: "showNotification"
  description: string
  title: string
  notificationType: NotificationType
  duration: number
}

export interface ActionsProps {
  handleUpdateItem: (index: number, value: BaseEventItem) => void
  handleCopyItem: (index: number) => void
  handleDeleteItem: (index: number) => void
}
