import { ComponentTreeNode, PADDING_MODE } from "@illa-public/public-types"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export enum PAGINATION_TYPE {
  LIMIT_OFFSET_BASED = "limitOffsetBased",
  CURSOR_BASED = "cursorBased",
}

export enum COLUMN_NUM_ADAPTATION {
  FIXED = "fixed",
  DYNAMIC = "dynamic",
}

type ItemPadding = {
  size: string
  mode: PADDING_MODE
}

export type ShadowOptions = "none" | "small" | "medium" | "large"
export interface GridListWidgetProps extends BaseWidgetProps {
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
  itemGapX?: number
  itemGapY?: number
  itemHeight: number
  currentPage: number
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
  columnNumAdaptation?: COLUMN_NUM_ADAPTATION
  numberOfColumns?: number
  minColumnWidth?: number
  themeColor?: string
  loading?: boolean
  itemPadding?: ItemPadding
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
  itemPadding?: ItemPadding
}

export interface RenderCopyContainerProps {
  templateComponentNodes: ComponentTreeNode
  templateContainerHeight: number
  columnNumber: number
  displayNamePrefix: string
  itemPadding?: ItemPadding
}

export interface ListWidgetPropsWithChildrenNodes extends GridListWidgetProps {
  copyComponents: ComponentTreeNode[] | null
  handleUpdateSelectedItem: (index?: number, isContainerClick?: boolean) => void
  selectIndexForMark?: number
}
