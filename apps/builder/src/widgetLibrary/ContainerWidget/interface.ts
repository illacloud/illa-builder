import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface viewListItemShaper {
  id: string
  key: string
  label: string
  disabled?: boolean
  hidden?: boolean
}

export interface ContainerProps extends BaseWidgetProps {
  currentIndex: number
  componentNode: ComponentNode
  viewList: viewListItemShaper[]
  tooltipText?: string
  h: number
  linkWidgetDisplayName?: string
  unitH: number
  columnNumber: number
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}
