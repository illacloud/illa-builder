import { TableProps } from "@illa-design/table"

export interface WrappedTableProps extends Pick<TableProps<any, any>,
  | "loading"> {
  originData: object[]
  emptyState?: string
}

export interface TableWidgetProps extends WrappedTableProps {

}
