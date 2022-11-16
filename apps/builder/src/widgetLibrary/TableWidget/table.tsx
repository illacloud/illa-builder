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
      pageSize,
      defaultSort,
      columnVisibility,
      multiRowSelection,
      handleOnSortingChange,
      handleOnPaginationChange,
      handleOnColumnFiltersChange,
    } = props

    const formatData = useMemo(() => {
      if (Array.isArray(data)) {
        return data
      }
      return []
    }, [data])

    return (
      <Table
        bordered
        striped
        borderedCell
        pinedHeader
        w="100%"
        h="100%"
        data={formatData}
        columns={columns}
        filter={filter}
        loading={loading}
        download={download}
        overFlow={overFlow}
        pagination={{ pageSize }}
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
    pageSize,
    dataSource,
    dataSourceJS,
    dataSourceMode,
    displayName,
    defaultSortKey,
    defaultSortOrder,
    multiRowSelection,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

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

  const realDataSourceArray = useMemo(() => {
    if (dataSourceMode === "dynamic") {
      return dataSourceJS ? dataSourceJS : []
    }
    return dataSource ? dataSource : []
  }, [dataSource, dataSourceJS, dataSourceMode])

  console.log(realDataSourceArray, "realDataSourceArray")

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

  return (
    <WrappedTable
      data={realDataSourceArray}
      emptyState={emptyState}
      loading={loading}
      filter={filter}
      columns={columnsDef}
      download={download}
      overFlow={overFlow}
      pageSize={pageSize}
      columnVisibility={columnVisibility}
      defaultSort={defaultSort}
      multiRowSelection={multiRowSelection}
    />
  )
}

WrappedTable.displayName = "WrappedTable"
