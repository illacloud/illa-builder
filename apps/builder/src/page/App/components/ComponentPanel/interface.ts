import { HTMLAttributes, ReactNode } from "react"
import { SessionType } from "@/page/App/components/ComponentPanel/componentListBuilder"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export interface WidgetCardInfo {
  id: string
  keywords: string[]
  displayName: string
  widgetName: string
  widgetType: string
  icon: ReactNode
  isPremiumWidget: boolean
}

export type ComponentSessionProps = {
  sessionTitle: string
  sessionType: SessionType
  widgetCardInfos: WidgetCardInfo[]
}

export type TypeMapComponent = {
  [key in SessionType]: WidgetCardInfo[]
}

export interface ComponentItemProps {
  widgetName: string
  displayName: string
  widgetType: string
  icon: ReactNode
  isPremiumWidget: boolean
}
