import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Table } from "@illa-design/table"
import { TableWidgetProps, WrappedTableProps } from "./interface"
import { ColumnDef } from "@tanstack/react-table"

export const WrappedTable = forwardRef<HTMLInputElement, WrappedTableProps>((props, ref) => {
    const { data, loading, emptyState, columns } = props

    console.log({ columns })
    return (
      <Table
        data={data}
        columns={columns}
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
  },
)

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const {
    data,
    emptyState,
    loading,
    columns,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
  } = props

  const tableWrapperRef = useRef<HTMLDivElement>(null)

  let columnsDef = useMemo(() => {
    console.log("data update")
    if (columns?.length) {
      return columns
    }
    let l: ColumnDef<object>[] = []
    if (data && data.length > 0) {
      Object.keys(data[0]).forEach((key) => {
        l.push({
          header: key,
          accessorKey: key,
        })
      })
    }

    return l
  }, [data])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      columns: columnsDef,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    columnsDef,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  useEffect(() => {
    if (tableWrapperRef.current) {
      updateComponentHeight(tableWrapperRef.current?.clientHeight)
    }
  }, [
    data,
  ])

  return <div ref={tableWrapperRef}>
    <WrappedTable data={data} emptyState={emptyState} loading={loading} columns={columns} />
  </div>
}
