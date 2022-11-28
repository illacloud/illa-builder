import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export enum OVERFLOW_TYPE {
  PAGINATION = "PAGINATION",
  SCROLL = "SCROLL",
}
export interface ListWidgetProps extends BaseWidgetProps {
  dataSources?: Array<unknown>
  overflowMethod?: OVERFLOW_TYPE
  pageSize?: number
  itemHeight: number
  currentPage: number
}

export interface RenderTemplateContainerProps {
  templateComponentNodes: ComponentNode
  templateContainerHeight: number
}
