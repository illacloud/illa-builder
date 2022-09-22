import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Table } from "@illa-design/table"
import { TableWidgetProps, WrappedTableProps } from "./interface"
import { ColumnDef } from "@tanstack/react-table"

export const WrappedTable = forwardRef<HTMLInputElement, WrappedTableProps>((props, ref) => {
    const { data, loading, emptyState, columns, defaultSort } = props

    console.log({ columns })
    return (
      <Table
        data={data}
        columns={columns}
        loading={loading}
        emptyProps={{ description: emptyState }}
        defaultSort={defaultSort}
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
    defaultSortKey,
    defaultSortOrder,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
  } = props

  const tableWrapperRef = useRef<HTMLDivElement>(null)

  const defaultSort = useMemo(() => {
    if (!defaultSortKey) return undefined
    return [{
      id: defaultSortKey,
      desc: defaultSortOrder === "descend",
    }]

  }, [defaultSortOrder, defaultSortKey])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      defaultSort,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
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
    <WrappedTable data={data} emptyState={emptyState} loading={loading} columns={columns}
                  defaultSort={defaultSort} />
  </div>
}
