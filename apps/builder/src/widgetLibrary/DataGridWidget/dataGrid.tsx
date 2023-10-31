import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material"
import {
  DataGridPremium,
  GridColDef,
  LicenseInfo,
} from "@mui/x-data-grid-premium"
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium"
import { get, isArray, isNumber } from "lodash"
import React, { FC, MutableRefObject, useEffect, useMemo, useRef } from "react"
import { useDispatch } from "react-redux"
import { v4 } from "uuid"
import { getColor } from "@illa-design/react"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import {
  getColumnFromType,
  getColumnTypeFromValue,
  getSafeColumn,
} from "@/widgetLibrary/DataGridWidget/columnDeal"
import { Toolbar } from "./Toolbar"
import { BaseDataGridProps } from "./interface"

LicenseInfo.setLicenseKey(import.meta.env.ILLA_MUI_LICENSE)

export const DataGridWidget: FC<BaseDataGridProps> = (props) => {
  const {
    loading,
    triggerEventHandler,
    dataSource,
    dataSourceJS,
    dataSourceMode,
    sortKey,
    sortOrder,
    handleUpdateMultiExecutionResult,
    displayName,
    rowSelection,
    rowSelectionMode,
    overFlow,
    pageSize,
    page,
    pageSizeOptions,
    columnSetting,
    densitySetting,
    refreshSetting,
    quickFilterSetting,
    exportSetting,
    exportAllSetting,
    filterSetting,
    enableServerSidePagination,
    totalRowCount,
    primaryKey,
    filterModel,
    selectedRowsPrimaryKeys,
    excludeHiddenColumns,
    columnVisibilityModel,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    columns,
  } = props

  const rawData = dataSourceMode === "dynamic" ? dataSourceJS : dataSource

  const arrayData: object[] = dealRawData2ArrayData(rawData)

  const ref = useRef<GridApiPremium>(null) as MutableRefObject<GridApiPremium>

  const dispatch = useDispatch()

  const isInnerDragging = useRef(false)

  const toolbar = () => {
    return (
      <Toolbar
        columnSetting={columnSetting}
        densitySetting={densitySetting}
        exportSetting={exportSetting}
        exportAllSetting={exportAllSetting}
        filterSetting={filterSetting}
        quickFilterSetting={quickFilterSetting}
        refreshSetting={refreshSetting}
        onRefresh={() => {
          triggerEventHandler("onRefresh")
        }}
      />
    )
  }

  useEffect(() => {
    updateComponentRuntimeProps({
      refresh: () => {
        triggerEventHandler("onRefresh")
      },
      setFilterModel: (model: unknown) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              filterModel: model,
            },
          },
        ])
        triggerEventHandler("onFilterModelChange")
      },
      setColumnVisibilityModel: (model: unknown) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              columnVisibilityModel: model,
            },
          },
        ])
        triggerEventHandler("onColumnVisibilityChange")
      },
      setPage: (page: unknown) => {
        if (isNumber(page)) {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                page,
              },
            },
          ])
          triggerEventHandler("onPaginationModelChange")
        }
      },
      setPageSize: (pageSize: unknown) => {
        if (isNumber(pageSize)) {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                pageSize,
              },
            },
          ])
          triggerEventHandler("onPaginationModelChange")
        }
      },
      setSelectedRows: (rows: unknown) => {
        if (isArray(rows)) {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                selectedRows: rows,
              },
            },
          ])
          triggerEventHandler("onRowSelectionModelChange")
        }
      },
      selectedRowsPrimaryKeys: (ids: unknown) => {
        if (isArray(ids)) {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                selectedRowsPrimaryKeys: ids,
              },
            },
          ])
          triggerEventHandler("onRowSelectionModelChange")
        }
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
    displayName,
  ])

  const renderColumns = useMemo(() => {
    return columns?.map((column) => {
      const safeColumn = getSafeColumn(column)
      return safeColumn.columnType === "auto"
        ? getColumnFromType({
            ...safeColumn,
            columnType: getColumnTypeFromValue(
              get(arrayData[0], safeColumn.field),
            ),
          })
        : getColumnFromType(safeColumn)
    })
  }, [arrayData, columns])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: { main: getColor("blue", "03") },
          },
        })}
      >
        <DataGridPremium
          apiRef={ref}
          getRowId={(row) => {
            if (primaryKey === undefined || primaryKey === "—") {
              return v4()
            } else {
              if (primaryKey in row) {
                return get(row, primaryKey) ?? v4()
              }
            }
          }}
          filterModel={
            filterModel !== undefined
              ? {
                  ...filterModel,
                  quickFilterExcludeHiddenColumns:
                    filterModel.quickFilterExcludeHiddenColumns ??
                    excludeHiddenColumns,
                }
              : undefined
          }
          onFilterModelChange={(model) => {
            handleUpdateMultiExecutionResult([
              {
                displayName,
                value: {
                  filterModel: model,
                },
              },
            ])
            triggerEventHandler("onFilterModelChange")
          }}
          rowSelectionModel={rowSelection ? selectedRowsPrimaryKeys : undefined}
          rowSelection={rowSelection}
          onColumnVisibilityModelChange={(model) => {
            handleUpdateMultiExecutionResult([
              {
                displayName,
                value: {
                  columnVisibilityModel: model,
                },
              },
            ])
            triggerEventHandler("onColumnVisibilityChange")
          }}
          columnVisibilityModel={columnVisibilityModel}
          onRowSelectionModelChange={(model) => {
            handleUpdateMultiExecutionResult([
              {
                displayName,
                value: {
                  selectedRowsPrimaryKeys: model,
                  selectedRows: model.map((id) =>
                    ref.current.getRowModels().get(id),
                  ),
                },
              },
            ])
            triggerEventHandler("onRowSelectionModelChange")
          }}
          sortModel={
            sortKey != undefined && sortOrder != undefined
              ? [
                  {
                    field: sortKey,
                    sort: sortOrder === "default" ? null : sortOrder,
                  },
                ]
              : []
          }
          pagination={overFlow === "pagination"}
          pageSizeOptions={isArray(pageSizeOptions) ? pageSizeOptions : []}
          autoPageSize={pageSize === undefined}
          paginationModel={
            pageSize !== undefined
              ? {
                  pageSize: pageSize ?? 0,
                  page: page ?? 0,
                }
              : undefined
          }
          onPaginationModelChange={(model) => {
            handleUpdateMultiExecutionResult([
              {
                displayName,
                value: {
                  page: model.page,
                  pageSize: model.pageSize,
                },
              },
            ])
            triggerEventHandler("onPaginationModelChange")
          }}
          onSortModelChange={(model) => {
            if (model.length > 0) {
              handleUpdateMultiExecutionResult([
                {
                  displayName,
                  value: {
                    sortKey: model[0].field,
                    sortOrder: model[0].sort,
                  },
                },
              ])
            } else {
              handleUpdateMultiExecutionResult([
                {
                  displayName,
                  value: {
                    sortKey: undefined,
                    sortOrder: undefined,
                  },
                },
              ])
            }
            triggerEventHandler("onSortModelChange")
          }}
          disableMultipleRowSelection={
            rowSelectionMode === "single" || !rowSelection
          }
          checkboxSelection={rowSelection && rowSelectionMode === "multiple"}
          rows={arrayData}
          columns={(renderColumns as GridColDef[]) ?? []}
          paginationMode={enableServerSidePagination ? "server" : "client"}
          rowCount={
            totalRowCount !== undefined
              ? Math.ceil(totalRowCount / (pageSize ?? 1))
              : undefined
          }
          keepNonExistentRowsSelected={enableServerSidePagination}
          loading={loading}
          slots={{
            toolbar: toolbar,
          }}
          onColumnHeaderEnter={() => {
            dispatch(executionActions.setResizingNodeIDsReducer([displayName]))
            isInnerDragging.current = true
          }}
          onColumnHeaderLeave={() => {
            dispatch(executionActions.setResizingNodeIDsReducer([]))
            isInnerDragging.current = false
          }}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

DataGridWidget.displayName = "DataGridWidget"
export default DataGridWidget
