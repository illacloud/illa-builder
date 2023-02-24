import { RowSelectionState } from "@tanstack/table-core"
import { cloneDeep, isEqual } from "lodash"
import { FC, forwardRef, useCallback, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { Table, isObject } from "@illa-design/react"
import { getIllaMode } from "@/redux/config/configSelector"
import {
  ColumnItemShape,
  TableWidgetProps,
  WrappedTableProps,
} from "./interface"
import { getCellForType, tansDataFromOld, transTableColumnEvent } from "./utils"

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
      rowSelection,
      selectedRow,
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

    const onRowSelectionChange = useCallback(
      (value?: RowSelectionState) => {
        let selectedRow: unknown[] = []
        if (isObject(value)) {
          Object.keys(value)?.map((key) => {
            const index = Number(key)
            if (formatData[index]) {
              selectedRow.push(formatData[index])
            }
          })
        }
        const updateValue = {
          selectedRow: selectedRow,
          rowSelection: value,
        }
        if (mode === "edit") {
          handleUpdateOriginalDSLMultiAttr(updateValue)
        } else {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: updateValue,
            },
          ])
        }
      },
      [
        displayName,
        formatData,
        handleUpdateMultiExecutionResult,
        handleUpdateOriginalDSLMultiAttr,
        mode,
        multiRowSelection,
      ],
    )

    return (
      <Table
        bordered
        striped
        borderedCell
        pinedHeader
        w="100%"
        h="100%"
        colorScheme={"techPurple"}
        rowSelection={rowSelection}
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
    selectedRow,
    rowSelection,
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
    handleUpdateGlobalData(displayName, {
      defaultSort,
      columns,
      selectedRow,
      rowSelection,
      dataSourceJS: dataSourceJS ?? [],
      dataSource: dataSource ?? [],
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    defaultSort,
    columns,
    selectedRow,
    rowSelection,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    dataSourceJS,
    dataSource,
  ])

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
      download={download}
      overFlow={overFlow}
      pageSize={pageSize}
      columnVisibility={columnVisibility}
      defaultSort={defaultSort}
      multiRowSelection={multiRowSelection}
      handleUpdateGlobalData={handleUpdateGlobalData}
      handleDeleteGlobalData={handleDeleteGlobalData}
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
