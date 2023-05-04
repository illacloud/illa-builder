import { PaginationState } from "@tanstack/react-table"
import { Table as ReactTable, RowSelectionState } from "@tanstack/table-core"
import { cloneDeep, debounce } from "lodash"
import { FC, useCallback, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { Table, isObject } from "@illa-design/react"
import { getIllaMode } from "@/redux/config/configSelector"
import {
  ColumnItemShape,
  TableWidgetProps,
  WrappedTableProps,
} from "./interface"
import { getCellForType, transTableColumnEvent } from "./utils"

export const WrappedTable: FC<WrappedTableProps> = (props) => {
  const {
    displayName,
    data,
    loading,
    emptyState,
    columns,
    columnSizing,
    filter,
    download,
    overFlow,
    pageSize,
    rowSelection,
    defaultSort,
    columnVisibility,
    multiRowSelection,
    handleOnSortingChange,
    handleOnPaginationChange,
    handleOnColumnFiltersChange,
    handleUpdateMultiExecutionResult,
    handleUpdateOriginalDSLMultiAttr,
  } = props

  const mode = useSelector(getIllaMode)

  const formatData = useMemo(() => {
    if (Array.isArray(data)) {
      return data
    }
    return []
  }, [data])

  const handleUpdateMulti = useCallback(
    (value: Record<string, any>) => {
      if (mode === "edit") {
        handleUpdateOriginalDSLMultiAttr(value)
      } else {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value,
          },
        ])
      }
    },
    [
      mode,
      handleUpdateMultiExecutionResult,
      handleUpdateOriginalDSLMultiAttr,
      displayName,
    ],
  )

  const onRowSelectionChange = useCallback(
    (value?: RowSelectionState) => {
      let selectedRow: unknown[] = []
      let selectedRowIndex: unknown[] = []
      if (isObject(value)) {
        Object.keys(value)?.map((key) => {
          const index = Number(key)
          if (formatData[index]) {
            selectedRow.push(formatData[index])
            selectedRowIndex.push(index)
          }
        })
      }
      const updateValue = {
        selectedRowIndex,
        selectedRow,
        rowSelection: value,
      }
      handleUpdateMulti(updateValue)
    },
    [formatData, handleUpdateMulti],
  )

  const onPaginationChange = useCallback(
    (paginationState: PaginationState, table: ReactTable<any>) => {
      const data = table.getSortedRowModel().rows
      const displayedData = data?.map((item) => {
        const dataRecord: Record<string, unknown> = {}
        item.getVisibleCells().forEach((cell) => {
          dataRecord[cell.column.id] = cell.getValue()
        })
        return dataRecord
      })
      const displayedDataIndices = data?.map((item) => {
        return item.index
      })
      const { pageIndex, pageSize } = paginationState
      const paginationOffset = pageIndex > 0 ? pageIndex * pageSize : 0
      const updateValue = {
        pageIndex,
        paginationOffset,
        displayedData,
        displayedDataIndices,
      }
      // only update execution result
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: updateValue,
        },
      ])
      handleOnPaginationChange?.()
    },
    [displayName, handleUpdateMultiExecutionResult, handleOnPaginationChange],
  )

  return (
    <Table
      bordered
      striped
      borderedCell
      pinedHeader
      w="100%"
      h="100%"
      enableColumnResizing={mode === "edit"}
      colorScheme={"techPurple"}
      rowSelection={rowSelection}
      data={formatData}
      columns={columns}
      columnSizing={columnSizing}
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
      onPaginationChange={onPaginationChange}
      onColumnFiltersChange={handleOnColumnFiltersChange}
      onColumnSizingChange={debounce((columnSizing) => {
        handleUpdateMulti({ columnSizing })
      }, 100)}
      onRowSelectionChange={onRowSelectionChange}
    />
  )
}

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const {
    emptyState,
    selectedRow,
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
    columnSizing,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    ...otherProps
  } = props

  const handleOnSortingChange = useCallback(() => {
    triggerEventHandler("sortingChange")
  }, [triggerEventHandler])

  const handleOnPaginationChange = useCallback(() => {
    triggerEventHandler("paginationChange")
  }, [triggerEventHandler])

  const handleOnColumnFiltersChange = useCallback(() => {
    triggerEventHandler("columnFiltersChange")
  }, [triggerEventHandler])

  const handleOnClickMenuItem = useCallback(
    (path: string) => {
      triggerEventHandler("clickMenuItem", path)
    },
    [triggerEventHandler],
  )

  const defaultSort = useMemo(() => {
    if (!defaultSortKey || defaultSortKey === "default") return []
    const columnsKeys = columns.map((item: ColumnItemShape) => {
      return item.accessorKey
    })
    if (!columnsKeys.includes(defaultSortKey)) return []
    return [
      {
        id: defaultSortKey,
        desc: defaultSortOrder === "descend",
      },
    ]
  }, [defaultSortOrder, defaultSortKey, columns])

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
      const eventPath = `rowEvents.${index}`
      const transItem = cloneDeep(item) as ColumnItemShape
      transItem["cell"] = getCellForType(
        transItem,
        eventPath,
        handleOnClickMenuItem,
        index,
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

  const rowEvents = useMemo(() => {
    const res: Record<string, any> = {}
    columns?.forEach((item, index) => {
      const { events } = item as ColumnItemShape
      if (events) {
        res[index] = transTableColumnEvent(events, realDataSourceArray.length)
      }
    })
    return res
  }, [columns, realDataSourceArray?.length])

  useEffect(() => {
    handleUpdateOriginalDSLMultiAttr({
      rowEvents,
    })
  }, [handleUpdateOriginalDSLMultiAttr, rowEvents])

  return (
    <WrappedTable
      {...otherProps}
      selectedRow={selectedRow}
      displayName={displayName}
      data={realDataSourceArray}
      emptyState={emptyState}
      loading={loading}
      filter={filter}
      columns={columnsDef}
      columnSizing={columnSizing}
      download={download}
      overFlow={overFlow}
      pageSize={pageSize}
      columnVisibility={columnVisibility}
      defaultSort={defaultSort}
      multiRowSelection={multiRowSelection}
      updateComponentRuntimeProps={updateComponentRuntimeProps}
      deleteComponentRuntimeProps={deleteComponentRuntimeProps}
      handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
      handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
      handleUpdateDsl={handleUpdateDsl}
      handleOnSortingChange={handleOnSortingChange}
      handleOnPaginationChange={handleOnPaginationChange}
      handleOnColumnFiltersChange={handleOnColumnFiltersChange}
    />
  )
}

WrappedTable.displayName = "WrappedTable"
