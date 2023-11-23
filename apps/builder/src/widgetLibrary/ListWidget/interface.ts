import { ComponentTreeNode } from "@illa-public/public-types"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export enum PAGINATION_TYPE {
  LIMIT_OFFSET_BASED = "limitOffsetBased",
  CURSOR_BASED = "cursorBased",
}
export type ShadowOptions = "none" | "small" | "medium" | "large"
export interface ListWidgetProps extends BaseWidgetProps {
  dataSources?: Array<unknown>
  enablePagination?: boolean
  enableServerSidePagination?: boolean
  paginationType?: PAGINATION_TYPE
  page?: number
  pageSize?: number
  previousCursor?: string
  nextCursor?: string
  hasNextPage?: boolean
  totalRowCount?: number
  itemGap?: number
  itemHeight: number
  currentPage: number
  selectedIndex: number
  itemBackGroundColor: string
  itemBorderWidth?: string
  itemBorderColor?: string
  itemBorderRadius?: string
  itemShadow?: ShadowOptions
  disabled: boolean
  columnNumber: number
  dynamicHeight: "auto" | "fixed" | "limited"
  h: number
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  themeColor?: string
  loading?: boolean
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
  extraHeight?: number
  itemGap?: number
  enableAutoPagination?: boolean
  itemShadow?: ShadowOptions
}

export interface RenderCopyContainerProps {
  templateComponentNodes: ComponentTreeNode
  templateContainerHeight: number
  columnNumber: number
  displayNamePrefix: string
}

export interface ListWidgetPropsWithChildrenNodes extends ListWidgetProps {
  copyComponents: ComponentTreeNode[] | null
  selectIndexForMark?: number
  handleUpdateSelectedItem: (index: number) => void
}
