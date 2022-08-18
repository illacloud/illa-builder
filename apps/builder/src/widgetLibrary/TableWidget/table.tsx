import { FC } from "react"
import { Table } from "@illa-design/table"
import { TableWidgetProps, WrappedTableProps } from "./interface"
import { ColumnDef } from "@tanstack/react-table"

export const WrappedTable: FC<WrappedTableProps> = (props) => {
  const { originData } = props

  let columnsDef: ColumnDef<object>[] = []

  if (originData && originData.length > 0) {
    Object.keys(originData[0]).forEach((key) => {
      columnsDef.push({
        header: key,
        accessorKey: key,
      })
    })
  }

  return (
    <Table
      data={originData}
      columns={columnsDef}
      bordered
      pinedHeader
      disableFilters
      w="100%"
      h="100%"
    />
  )
}

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const { originData } = props
  return <WrappedTable originData={originData} />
}
