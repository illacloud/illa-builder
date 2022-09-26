import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Table } from "@illa-design/table"
import {
  ColumnItemShape,
  TableWidgetProps,
  WrappedTableProps,
} from "./interface"
import { transDataForType } from "@/widgetLibrary/TableWidget/utils"

export const WrappedTable = forwardRef<HTMLInputElement, WrappedTableProps>(
  (props, ref) => {
    const {
      data,
      loading,
      emptyState,
      columns,
      defaultSort,
      columnVisibility,
      handleOnSortingChange,
      handleOnPaginationChange,
      handleOnColumnFiltersChange,
    } = props

    return (
      <Table
        data={data}
        columns={columns}
        loading={loading}
        emptyProps={{ description: emptyState }}
        defaultSort={defaultSort}
        columnVisibility={columnVisibility}
        bordered
        striped
        borderedCell
        pinedHeader
        w="100%"
        h="100%"
        onSortingChange={handleOnSortingChange}
        onPaginationChange={handleOnPaginationChange}
        onColumnFiltersChange={handleOnColumnFiltersChange}
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
    return [
      {
        id: defaultSortKey,
        desc: defaultSortOrder === "descend",
      },
    ]
  }, [defaultSortOrder, defaultSortKey])

  const columnVisibility = useMemo(() => {
    const res: Record<string, boolean> = {}
    columns?.map((item) => {
      const { visible, accessorKey } = item as ColumnItemShape
      if (!visible) {
        res[accessorKey] = false
      }
    })
    return res
  }, [columns])

  const columnsDef = useMemo(() => {
    const res: ColumnItemShape[] = []
    columns?.map((item) => {
      const transItem = JSON.parse(JSON.stringify(item)) as ColumnItemShape
      transItem["header"] = transDataForType(transItem)
      res.push(transItem)
    })
    return res
  }, [columns])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      defaultSort,
      data,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    defaultSort,
    data,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  useEffect(() => {
    if (tableWrapperRef.current) {
      updateComponentHeight(tableWrapperRef.current?.clientHeight)
    }
  }, [data])

  return (
    <div ref={tableWrapperRef}>
      <WrappedTable
        data={data}
        emptyState={emptyState}
        loading={loading}
        columns={columnsDef}
        columnVisibility={columnVisibility}
        defaultSort={defaultSort}
      />
    </div>
  )
}

WrappedTable.displayName = "WrappedTable"