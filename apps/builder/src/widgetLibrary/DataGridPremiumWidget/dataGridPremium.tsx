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
  LicenseInfo,
  gridPaginatedVisibleSortedGridRowIdsSelector,
} from "@mui/x-data-grid-premium"
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef"
import {
  GridCsvGetRowsToExportParams,
  GridPrintGetRowsToExportParams,
} from "@mui/x-data-grid/models/gridExport"
import { isArray } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { dealRawData2ArrayData } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { ExportAllSetting } from "./ExportAllSetting"
import { BaseDataGridProps } from "./interface"

LicenseInfo.setLicenseKey(import.meta.env.ILLA_MUI_LICENSE)

export const DataGridPremiumWidget: FC<BaseDataGridProps> = (props) => {
  const {
    loading,
    dataSource,
    dataSourceJS,
    dataSourceMode,
    defaultSortKey,
    defaultSortOrder,
    handleUpdateMultiExecutionResult,
    displayName,
    multiRowSelection,
    overFlow,
    pageSize,
    page,
    pageSizeOptions,
    columnSetting,
    densitySetting,
    refreshSetting,
    exportSetting,
    exportAllSetting,
    filterSetting,
    enableServerSidePagination,
    totalRowCount,
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
          <Button startIcon={<RefreshIcon />} size="small">
            {t("widget.table.refresh")}
          </Button>
        )}
      </GridToolbarContainer>
    )
  }, [
    columnSetting,
    filterSetting,
    densitySetting,
    exportSetting,
    refreshSetting,
    t,
    exportAllSetting,
  ])

  return (
    <StyledEngineProvider injectFirst>
      <DataGridPremium
        sortModel={
          defaultSortKey != undefined && defaultSortOrder != undefined
            ? [
                {
                  field: defaultSortKey,
                  sort:
                    defaultSortOrder === "default" ? null : defaultSortOrder,
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
        }}
        onSortModelChange={(model) => {
          if (model.length > 0) {
            handleUpdateMultiExecutionResult([
              {
                displayName,
                value: {
                  defaultSortKey: model[0].field,
                  defaultSortOrder: model[0].sort,
                },
              },
            ])
          } else {
            handleUpdateMultiExecutionResult([
              {
                displayName,
                value: {
                  defaultSortKey: undefined,
                  defaultSortOrder: undefined,
                },
              },
            ])
          }
        }}
        checkboxSelection={multiRowSelection}
        rows={arrayData}
        columns={columns}
        paginationMode={enableServerSidePagination ? "server" : "client"}
        rowCount={
          totalRowCount !== undefined
            ? Math.ceil(totalRowCount / (pageSize ?? 1))
            : undefined
        }
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
