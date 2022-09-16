import { FC, useMemo } from "react"
import { Table } from "@illa-design/table"
import { TableWidgetProps, WrappedTableProps } from "./interface"
import { ColumnDef } from "@tanstack/react-table"

export const WrappedTable: FC<WrappedTableProps> = (props) => {
  const { originData, emptyState } = props

  let columnsDef: ColumnDef<object>[] = useMemo(() => {
    let l: ColumnDef<object>[] = []
    if (originData && originData.length > 0) {
      Object.keys(originData[0]).forEach((key) => {
        l.push({
          header: key,
          accessorKey: key,
        })
      })
    }
    console.log(l,'l')
    return l
  }, [originData])

  return (
    <Table
      data={originData}
      columns={columnsDef}
      bordered
      striped
      borderedCell
      pinedHeader
      w="100%"
      h="100%"
    />
  )
}

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const { originData, emptyState } = props
  return <WrappedTable originData={originData} emptyState={emptyState} />
}
