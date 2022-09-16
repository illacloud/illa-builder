import { FC, useMemo } from "react"
import { Table } from "@illa-design/table"
import { TableWidgetProps, WrappedTableProps } from "./interface"
import { ColumnDef } from "@tanstack/react-table"

export const WrappedTable: FC<WrappedTableProps> = (props) => {
  const { originData, loading, emptyState } = props

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

    return l
  }, [originData])

  return (
    <Table
      data={originData}
      columns={columnsDef}
      loading={loading}
      emptyProps={{ description: emptyState }}
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
  const { originData, emptyState, loading } = props

  return <WrappedTable originData={originData} emptyState={emptyState} loading={loading} />
}
