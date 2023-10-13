import FilterAltIcon from "@mui/icons-material/FilterAlt"
import RefreshIcon from "@mui/icons-material/Refresh"
import { Button, StyledEngineProvider } from "@mui/material"
import {
  DataGridPremium,
  GridGetRowsToExportParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  LicenseInfo,
  gridPaginatedVisibleSortedGridRowIdsSelector,
} from "@mui/x-data-grid-premium"
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium"
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef"
import {
  GridCsvGetRowsToExportParams,
  GridPrintGetRowsToExportParams,
} from "@mui/x-data-grid/models/gridExport"
import { get, isArray, isNumber } from "lodash"
import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { useTranslation } from "react-i18next"
import { v4 } from "uuid"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { ExportAllSetting } from "./ExportAllSetting"
import { BaseDataGridProps } from "./interface"

LicenseInfo.setLicenseKey(import.meta.env.ILLA_MUI_LICENSE)

export const DataGridPremiumWidget: FC<BaseDataGridProps> = (props) => {
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
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const { t } = useTranslation()

  const rawData = useMemo(() => {
    return dataSourceMode === "dynamic" ? dataSourceJS : dataSource
  }, [dataSource, dataSourceJS, dataSourceMode])

  const arrayData: object[] = useMemo(() => {
    return dealRawData2ArrayData(rawData)
  }, [rawData])

  const columns: GridColDef<object>[] = useMemo(() => {
    if (arrayData.length == 0) {
      return []
    } else {
      return Object.keys(arrayData[0]).map((key) => {
        return {
          field: key,
          width: 150,
          resizable: false,
        }
      })
    }
  }, [arrayData])

  const toolbar = useCallback(() => {
    return (
      <GridToolbarContainer>
        {columnSetting && <GridToolbarColumnsButton />}
        {filterSetting && (
          <GridToolbarFilterButton
            componentsProps={{
              button: {
                startIcon: <FilterAltIcon />,
              },
            }}
          />
        )}
        {densitySetting && <GridToolbarDensitySelector />}
        {exportSetting && (
          <GridToolbarExport
            excelOptions={{
              getRowsToExport: (params: GridGetRowsToExportParams) =>
                gridPaginatedVisibleSortedGridRowIdsSelector(params.apiRef),
            }}
            csvOptions={{
              getRowsToExport: (params: GridCsvGetRowsToExportParams) =>
                gridPaginatedVisibleSortedGridRowIdsSelector(params.apiRef),
            }}
            printOptions={{
              getRowsToExport: (params: GridPrintGetRowsToExportParams) =>
                gridPaginatedVisibleSortedGridRowIdsSelector(params.apiRef),
            }}
          />
        )}
        {exportAllSetting && <ExportAllSetting />}
        {refreshSetting && (
          <Button
            startIcon={<RefreshIcon />}
            size="small"
            onClick={() => {
              triggerEventHandler("onRefresh")
            }}
          >
            {t("widget.table.refresh")}
          </Button>
        )}
        {quickFilterSetting && <GridToolbarQuickFilter />}
      </GridToolbarContainer>
    )
  }, [
    columnSetting,
    filterSetting,
    densitySetting,
    exportSetting,
    exportAllSetting,
    refreshSetting,
    t,
    quickFilterSetting,
    triggerEventHandler,
  ])

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

  const ref = useRef<GridApiPremium>() as MutableRefObject<GridApiPremium>

  return (
    <StyledEngineProvider injectFirst>
      <DataGridPremium
        apiRef={ref}
        getRowId={(row) => {
          if (primaryKey === undefined || primaryKey === "—") {
            return v4()
          } else {
            if (primaryKey in row) {
              return get(row, primaryKey)
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
        onRowSelectionModelChange={(model) => {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                selectedRowsPrimaryKeys: model,
                selectedRows: Array.from(
                  ref.current.getSelectedRows().values(),
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
        columns={columns}
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
      />
    </StyledEngineProvider>
  )
}

DataGridPremiumWidget.displayName = "DataGridPremiumWidget"
export default DataGridPremiumWidget
