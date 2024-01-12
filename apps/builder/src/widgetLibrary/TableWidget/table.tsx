import { convertPathToString } from "@illa-public/dynamic-string"
import { PaginationState } from "@tanstack/react-table"
import {
  CellContext,
  Table as ReactTable,
  RowSelectionState,
} from "@tanstack/table-core"
import { klona } from "klona/json"
import { debounce, isEqual, toPath } from "lodash-es"
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useSelector } from "react-redux"
import {
  FilterOperator,
  FilterOptions,
  Table,
  TableHandler,
  isFilterOption,
  isNumber,
  isObject,
} from "@illa-design/react"
import { getIllaMode } from "@/redux/config/configSelector"
import { applyAlignmentStyle } from "@/widgetLibrary/TableWidget/style"
import {
  ColumnItemShape,
  TableWidgetProps,
  WrappedTableProps,
} from "./interface"
import {
  getCellForType,
  getMappedValueFromCellContext,
  getStringPropertyValue,
  transTableColumnEvent,
} from "./utils"

export const WrappedTable = forwardRef<TableHandler<any>, WrappedTableProps>(
  (props, ref) => {
    const {
      displayName,
      data,
      loading,
      emptyState,
      columns,
      columnSizing,
      filter,
      refresh,
      download,
      downloadRawData,
      overFlow,
      pageSize,
      pageIndex = 0,
      rowSelection,
      defaultSort,
      columnVisibility,
      multiRowSelection,
      enableSingleCellSelection,
      clickOutsideToResetSelection,
      enableServerSidePagination,
      totalRowCount,
      paginationType,
      nextBeforeCursor,
      nextAfterCursor,
      handleOnRefresh,
      handleOnRowClick,
      handleOnSortingChange,
      handleOnPaginationChange,
      handleOnFiltersChange,
      handleOnRowSelectChange,
      handleOnCellSelect,
      handleUpdateMultiExecutionResult,
      handleUpdateOriginalDSLMultiAttr,
    } = props

    const mode = useSelector(getIllaMode)
    const [cachedData, setCachedData] = useState<any[]>([])

    const formatData = useMemo(() => {
      if (Array.isArray(data)) {
        return data
      }
      return []
    }, [data])

    const isCursorPaginationEnabled = useMemo(() => {
      return (
        (paginationType === "cursorBased" ||
          paginationType === "graphqlRelayCursorBased") &&
        enableServerSidePagination
      )
    }, [paginationType, enableServerSidePagination])

    const cursorBasedData = useMemo(() => {
      const _pageSize = pageSize ? pageSize : data?.length ?? 10
      const paginationOffset = pageIndex * _pageSize

      return cachedData.slice(paginationOffset, paginationOffset + _pageSize)
    }, [cachedData, pageIndex, pageSize, data?.length])

    const updateCachedData = useCallback(
      (data: Array<unknown>) => {
        if (paginationType === "cursorBased") {
          setCachedData((prevData = []) => {
            if (isEqual(prevData, data)) {
              return prevData
            }
            return [...prevData, ...data]
          })
        }
      },
      [paginationType],
    )

    useEffect(() => {
      updateCachedData(formatData)
    }, [formatData, updateCachedData])

    const handleUpdateMulti = useCallback(
      (value: Record<string, any>) => {
        if (mode === "edit") {
          handleUpdateOriginalDSLMultiAttr(value, true)
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
        handleOnRowSelectChange?.()
      },
      [formatData, handleUpdateMulti, handleOnRowSelectChange],
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
        const { pageIndex: _pageIndex, pageSize } = paginationState
        const paginationOffset = _pageIndex > 0 ? _pageIndex * pageSize : 0
        const updateValue: Record<string, unknown> = {
          pageIndex: _pageIndex,
          paginationOffset,
          displayedData,
          displayedDataIndices,
        }
        if (enableServerSidePagination) {
          if (paginationType === "cursorBased") {
            if (pageIndex > _pageIndex) {
              // updateValue["beforeCursor"] = nextAfterCursor
            } else {
              updateValue["afterCursor"] = nextAfterCursor
            }
          } else if (paginationType === "graphqlRelayCursorBased") {
            if (pageIndex > _pageIndex) {
              updateValue["beforeCursor"] = nextBeforeCursor
              updateValue["afterCursor"] = null
            } else {
              updateValue["beforeCursor"] = null
              updateValue["afterCursor"] = nextAfterCursor
            }
          }
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
      [
        displayName,
        handleUpdateMultiExecutionResult,
        handleOnPaginationChange,
        enableServerSidePagination,
        nextBeforeCursor,
        nextAfterCursor,
        paginationType,
        pageIndex,
      ],
    )

    const onFiltersChange = useCallback(
      (filters: FilterOptions[], operator: FilterOperator) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              filters,
              filterOperator: operator,
            },
          },
        ])
        handleOnFiltersChange?.()
      },
      [displayName, handleUpdateMultiExecutionResult, handleOnFiltersChange],
    )

    return (
      <Table
        bordered
        striped
        borderedCell
        pinedHeader
        w="100%"
        h="100%"
        tableRef={ref}
        enableColumnResizing={mode === "edit"}
        enableSingleCellSelection={enableSingleCellSelection}
        serverSidePagination={enableServerSidePagination}
        total={totalRowCount}
        colorScheme={"techPurple"}
        rowSelection={rowSelection}
        data={paginationType === "cursorBased" ? cursorBasedData : formatData}
        columns={columns}
        columnSizing={columnSizing}
        filter={filter}
        loading={loading}
        refresh={refresh}
        download={download}
        downloadRawData={downloadRawData}
        overFlow={overFlow}
        pagination={{
          pageSize: enableServerSidePagination
            ? pageSize
              ? pageSize
              : data?.length
            : pageSize,
          disableSimplePageJump: isCursorPaginationEnabled,
        }}
        emptyProps={{ description: emptyState }}
        defaultSort={defaultSort}
        columnVisibility={columnVisibility}
        multiRowSelection={multiRowSelection}
        clickOutsideToResetRowSelect={clickOutsideToResetSelection}
        onRefresh={handleOnRefresh}
        onRowClick={handleOnRowClick}
        onPaginationChange={onPaginationChange}
        onGlobalFiltersChange={onFiltersChange}
        onColumnFiltersChange={handleOnFiltersChange}
        onColumnSizingChange={debounce((columnSizing) => {
          handleUpdateMulti({ columnSizing })
        }, 100)}
        onRowSelectionChange={onRowSelectionChange}
        onSortingChange={(sortState) => {
          let sort
          if (sortState?.length) {
            sort = {
              sortKey: sortState[0].id,
              sortOrder: sortState[0].desc ? "descend" : "ascend",
            }
          }
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: { sort },
            },
          ])
          handleOnSortingChange?.()
        }}
        onCellSelectionChange={(cell) => {
          const selectedCell: Record<string, unknown> = cell
            ? {
                index: cell.row.index,
                columnName: cell.column.id,
                value: cell.getValue(),
              }
            : {}
          if (cell?.column.columnDef.meta?.haveMappedValue) {
            selectedCell["mappedValue"] =
              cell.column.columnDef.meta?.getRenderedValueAsString?.(
                cell.getContext(),
              )
          }
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: { selectedCell },
            },
          ])
          handleOnCellSelect()
        }}
      />
    )
  },
)

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
    triggerMappedEventHandler,
    ...otherProps
  } = props

  const tableRef = useRef<TableHandler<any>>(null)

  const handleOnRefresh = useCallback(() => {
    triggerEventHandler("refresh")
  }, [triggerEventHandler])

  const handleOnCellSelect = useCallback(() => {
    triggerEventHandler("onCellSelect")
  }, [triggerEventHandler])

  const handleOnRowClick = useCallback(() => {
    triggerEventHandler("rowClick")
  }, [triggerEventHandler])

  const handleOnRowSelectChange = useCallback(() => {
    triggerEventHandler("rowSelectChange")
  }, [triggerEventHandler])

  const handleOnSortingChange = useCallback(() => {
    triggerEventHandler("sortingChange")
  }, [triggerEventHandler])

  const handleOnPaginationChange = useCallback(() => {
    triggerEventHandler("paginationChange")
  }, [triggerEventHandler])

  const handleOnFiltersChange = useCallback(() => {
    triggerEventHandler("filtersChange")
  }, [triggerEventHandler])

  const handleOnClickMenuItem = useCallback(
    (path: string, index?: number) => {
      if (isNumber(index)) {
        triggerMappedEventHandler(
          "clickMenuItem",
          path,
          index,
          (path) => {
            return convertPathToString(toPath(path).slice(-2))
          },
          (dynamicString) => {
            // if dynamicString contain currentRow return true
            return dynamicString.includes("currentRow")
          },
        )
      } else {
        triggerEventHandler("clickMenuItem", path)
      }
    },
    [triggerEventHandler, triggerMappedEventHandler],
  )

  const isColumnsKey = useCallback(
    (key: string) => {
      const columnsKeys = columns.map((item: ColumnItemShape) => {
        return item.accessorKey
      })
      return columnsKeys.includes(key)
    },
    [columns],
  )

  const defaultSort = useMemo(() => {
    if (!defaultSortKey || defaultSortKey === "default") return []
    if (!isColumnsKey(defaultSortKey)) return []

    return [
      {
        id: defaultSortKey,
        desc: defaultSortOrder === "descend",
      },
    ]
  }, [defaultSortOrder, defaultSortKey, isColumnsKey])

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
      const transItem = klona(item) as ColumnItemShape
      transItem["meta"] = {
        haveMappedValue: "mappedValue" in transItem,
        getBackgroundColor: (props: CellContext<any, unknown>) => {
          return getMappedValueFromCellContext(
            props,
            transItem.backgroundColor,
            transItem.fromCurrentRow,
            "backgroundColor",
            "",
          )
        },
        getRenderedValueAsString: (props: CellContext<any, unknown>) => {
          return getStringPropertyValue(
            props,
            transItem.mappedValue,
            transItem.fromCurrentRow,
          )
        },
        style: applyAlignmentStyle(item.alignment),
        custom: item.custom,
      }
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
    handleUpdateOriginalDSLMultiAttr(
      {
        rowEvents,
      },
      true,
    )
  }, [handleUpdateOriginalDSLMultiAttr, rowEvents])

  useEffect(() => {
    // use accessorKey as origin column name
    const customColumnIndices = columns.reduce<Record<number, string>>(
      (acc, column, index) => {
        if (column.custom) {
          acc[index] = column.header
        }
        return acc
      },
      {},
    )
    const columnNameIndices = columns.reduce<Record<number, string>>(
      (acc, column, index) => {
        if (column.custom) {
          acc[index] = column.header
        } else {
          acc[index] = column.accessorKey
        }
        return acc
      },
      {},
    )
    const renamedColumnNames = columns.reduce<Record<string, string>>(
      (acc, column) => {
        if (column.header !== column.accessorKey && !column.custom) {
          acc[column.accessorKey] = column.header
        }
        return acc
      },
      {},
    )
    const columnVisibility = columns.reduce<Record<string, boolean>>(
      (acc, column) => {
        if (column.custom) {
          acc[column.header] = !!column.visible
        } else {
          acc[column.accessorKey] = !!column.visible
        }
        return acc
      },
      {},
    )
    const columnMapper = columns.reduce<Record<string, unknown>>(
      (acc, column) => {
        if (column.custom) {
          acc[column.header] = column
        } else {
          // use accessorKey as origin column name
          acc[column.accessorKey] = column
        }
        return acc
      },
      {},
    )

    handleUpdateOriginalDSLMultiAttr(
      {
        customColumnIndices,
        columnNameIndices,
        renamedColumnNames,
        columnVisibility,
        columnMapper,
      },
      true,
    )
  }, [handleUpdateOriginalDSLMultiAttr, columns])

  useEffect(() => {
    updateComponentRuntimeProps({
      clearSelection: () => {
        tableRef.current?.clearSelection()
      },
      clearFilters: () => {
        tableRef.current?.setGlobalFilters([], "and")
      },
      setFilters: (filters: unknown, operator: string) => {
        const filterOperator =
          operator === "and" || operator === "or" ? operator : "and"
        if (Array.isArray(filters)) {
          const filterOptions = filters.filter((value) => {
            return isFilterOption(value)
          })
          tableRef.current?.setGlobalFilters(filterOptions, filterOperator)
        }
      },
      setSort: (sortKey: string, order: string) => {
        if (isColumnsKey(sortKey)) {
          tableRef.current?.table.setSorting([
            {
              id: sortKey,
              desc: order !== "ascend",
            },
          ])
        }
      },
      selectPage: (pageIndex: number) => {
        if (!isNumber(pageIndex)) {
          console.error("TypeError: value is not a number")
          return
        }
        tableRef.current?.selectPage(pageIndex)
      },
      selectRow: (indexOrIndices: unknown) => {
        if (isNumber(indexOrIndices)) {
          tableRef.current?.selectRow({ [indexOrIndices]: true })
        } else if (Array.isArray(indexOrIndices)) {
          const rowSelection = indexOrIndices
            .slice(0, multiRowSelection ? undefined : 1)
            .reduce((acc, value) => {
              if (isNumber(value)) {
                acc[value] = true
              }
              console.error(`TypeError: ${value} is not a number`)
              return acc
            }, {})
          tableRef.current?.selectRow(rowSelection)
        } else {
          console.error("TypeError: value is not a number or array")
        }
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    displayName,
    multiRowSelection,
    isColumnsKey,
  ])

  return (
    <WrappedTable
      {...otherProps}
      ref={tableRef}
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
      triggerMappedEventHandler={triggerMappedEventHandler}
      updateComponentRuntimeProps={updateComponentRuntimeProps}
      deleteComponentRuntimeProps={deleteComponentRuntimeProps}
      handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
      handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
      handleUpdateDsl={handleUpdateDsl}
      handleOnCellSelect={handleOnCellSelect}
      handleOnSortingChange={handleOnSortingChange}
      handleOnPaginationChange={handleOnPaginationChange}
      handleOnFiltersChange={handleOnFiltersChange}
      handleOnRowSelectChange={handleOnRowSelectChange}
      handleOnRowClick={handleOnRowClick}
      handleOnRefresh={handleOnRefresh}
    />
  )
}

WrappedTable.displayName = "WrappedTable"
export default TableWidget
