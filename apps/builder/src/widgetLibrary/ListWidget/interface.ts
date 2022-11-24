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
}
