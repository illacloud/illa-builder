import { FC, forwardRef, useCallback, useEffect, useMemo } from "react"
import { Table } from "@illa-design/table"
import { Updater, RowSelectionState } from "@tanstack/table-core"
import {
  ColumnItemShape,
  TableWidgetProps,
  WrappedTableProps,
} from "./interface"
import { cloneDeep } from "lodash"
import { getCellForType } from "./utils"
import { isObject } from "@illa-design/system"

export const WrappedTable = forwardRef<HTMLInputElement, WrappedTableProps>(
  (props, ref) => {
    const {
      displayName,
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
      handleUpdateMultiExecutionResult,
    } = props

    const formatData = useMemo(() => {
      if (Array.isArray(data)) {
        return data
      }
      return []
    }, [data])

    const onRowSelectionChange = useCallback(
      (value: Updater<RowSelectionState>) => {
        if (!isObject(value)) return
        let selectedRow: unknown[] = []
        Object.keys(value)?.map((key) => {
          const index = Number(key)
          if (formatData[index]) {
            selectedRow.push(formatData[index])
          }
        })
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              selectedRow: selectedRow,
            },
          },
        ])
      },
      [displayName, formatData, handleUpdateMultiExecutionResult],
    )

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
        onRowSelectionChange={onRowSelectionChange}
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
    handleOnClickMenuItem,
    ...otherProps
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
    columns?.forEach((item, index) => {
      const eventPath = `columns.${index}.events`
      const transItem = cloneDeep(item) as ColumnItemShape
      transItem["cell"] = getCellForType(
        transItem,
        eventPath,
        handleOnClickMenuItem,
      )
      res.push(transItem)
    })
    return res
  }, [columns, handleOnClickMenuItem])

  const realDataSourceArray = useMemo(() => {
    if (dataSourceMode === "dynamic") {
      return dataSourceJS ? dataSourceJS : []
    }
    return dataSource ? dataSource : []
  }, [dataSource, dataSourceJS, dataSourceMode])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      defaultSort,
      columns,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    defaultSort,
    columns,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  return (
    <WrappedTable
      {...otherProps}
      displayName={displayName}
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
      handleUpdateGlobalData={handleUpdateGlobalData}
      handleDeleteGlobalData={handleDeleteGlobalData}
      handleUpdateDsl={handleUpdateDsl}
    />
  )
}

WrappedTable.displayName = "WrappedTable"
