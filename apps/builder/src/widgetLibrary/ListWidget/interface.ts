import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

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
  selectedIndex: number
  itemBackGroundColor: string
  disabled: boolean
  blockColumns: number
  dynamicHeight: "auto" | "fixed" | "limited"
  h: number
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}

export interface RenderTemplateContainerProps {
  templateComponentNodes: ComponentNode
  templateContainerHeight: number
  blockColumns: number
  dynamicHeight: "auto" | "fixed" | "limited"
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  updateComponentHeight?: (newHeight: number) => void
  itemNumber?: number
  h: number
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}

export interface RenderCopyContainerProps {
  templateComponentNodes: ComponentNode
  templateContainerHeight: number
  blockColumns: number
}

export interface ListWidgetPropsWithChildrenNodes extends ListWidgetProps {
  copyComponents: ComponentNode[] | null
  handleUpdateSelectedItem: (index: number) => void
}
