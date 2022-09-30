import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Table } from "@illa-design/table"
import {
  ColumnItemShape,
  TableWidgetProps,
  WrappedTableProps,
} from "./interface"
import { cloneDeep } from "lodash"
import { getCellForType } from "./utils"

export const WrappedTable = forwardRef<HTMLInputElement, WrappedTableProps>(
  (props, ref) => {
    const {
      data,
      loading,
      emptyState,
      columns,
      filter,
      download,
      overFlow,
      defaultSort,
      columnVisibility,
      multiRowSelection,
      handleOnSortingChange,
      handleOnPaginationChange,
      handleOnColumnFiltersChange,
    } = props

    return (
      <Table
        bordered
        striped
        borderedCell
        pinedHeader
        w="100%"
        h="100%"
        data={data}
        columns={columns}
        filter={filter}
        loading={loading}
        download={download}
        overFlow={overFlow}
        emptyProps={{ description: emptyState }}
        defaultSort={defaultSort}
        columnVisibility={columnVisibility}
        multiRowSelection={multiRowSelection}
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
    filter,
    download,
    overFlow,
    displayName,
    defaultSortKey,
    defaultSortOrder,
    multiRowSelection,
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
    columns?.forEach((item) => {
      const { visible, accessorKey } = item as ColumnItemShape
      if (!visible) {
        res[accessorKey] = false
      }
    })
    return res
  }, [columns])

  const columnsDef = useMemo(() => {
    const res: ColumnItemShape[] = []
    columns?.forEach((item) => {
      const transItem = cloneDeep(item) as ColumnItemShape
      transItem["cell"] = getCellForType(transItem)
      res.push(transItem)
    })
    return res
  }, [columns])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      defaultSort,
      data,
      columns,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    defaultSort,
    data,
    columns,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  useEffect(() => {
    if (tableWrapperRef.current) {
      updateComponentHeight(tableWrapperRef.current?.clientHeight)
    }
  }, [data, columns, multiRowSelection, updateComponentHeight])

  return (
    <div ref={tableWrapperRef}>
      <WrappedTable
        data={data}
        emptyState={emptyState}
        loading={loading}
        filter={filter}
        columns={columnsDef}
        download={download}
        overFlow={overFlow}
        columnVisibility={columnVisibility}
        defaultSort={defaultSort}
        multiRowSelection={multiRowSelection}
      />
    </div>
  )
}

WrappedTable.displayName = "WrappedTable"
