import { ComponentTreeNode } from "@illa-public/public-types"
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
  columnNumber: number
  dynamicHeight: "auto" | "fixed" | "limited"
  h: number
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}

export interface RenderTemplateContainerProps {
  templateComponentDisplayName: string
  templateContainerHeight: number
  columnNumber: number
  dynamicHeight: "auto" | "fixed" | "limited"
  handleUpdateOriginalDSLMultiAttr: BaseWidgetProps["handleUpdateOriginalDSLMultiAttr"]
  updateComponentHeight?: (newHeight: number) => void
  itemNumber?: number
  h: number
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}

export interface RenderCopyContainerProps {
  templateComponentNodes: ComponentTreeNode
  templateContainerHeight: number
  columnNumber: number
  displayNamePrefix: string
}

export interface ListWidgetPropsWithChildrenNodes extends ListWidgetProps {
  copyComponents: ComponentTreeNode[] | null
  handleUpdateSelectedItem: (index: number) => void
}
