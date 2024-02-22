import { ComponentMapNode, PADDING_MODE } from "@illa-public/public-types"
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
  componentNode: ComponentMapNode
  viewList: viewListItemShaper[]
  tooltipText?: string
  h: number
  linkWidgetDisplayName?: string[]
  unitH: number
  columnNumber: number
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  padding?: {
    size: string
    mode: PADDING_MODE
  }
}
