import { StyledEngineProvider } from "@mui/material"
import {
  DataGridPremium,
  GridRenderCellParams,
  GridValueGetterParams,
  LicenseInfo,
} from "@mui/x-data-grid-premium"
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium"
import dayjs from "dayjs"
import { get, isArray, isNumber, isObject } from "lodash"
import React, { FC, MutableRefObject, useEffect, useMemo, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { useDispatch } from "react-redux"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { v4 } from "uuid"
import {
  Image,
  Link,
  Paragraph,
  Rate,
  SingleDatePicker,
  Space,
  Tag,
  TimePicker,
} from "@illa-design/react"
import {
  CurrencyCode,
  dealRawData2ArrayData,
  getHashCode,
  getPreColor,
  isValidLocale,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"
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
      switch (column.columnType) {
        case "auto":
        case "button":
        case "buttongroup":
        case "icongroup":
        case "text":
          return {
            ...column,
            type: "string",
          }
        case "rating":
          return {
            ...column,
            type: "number",
            renderCell: (params: GridRenderCellParams) => {
              const maxCount = isNumber(get(params.colDef, "maxCount"))
                ? get(params.colDef, "maxCount")
                : 5
              const num = isNumber(params.value) ? params.value : 0
              return <Rate count={maxCount} allowHalf readonly value={num} />
            },
          }
        case "percent":
          return {
            ...column,
            type: "number",
            renderCell: (params: GridRenderCellParams) => {
              const decimalPlaces = get(params.colDef, "decimalPlaces")
              const locale = isValidLocale(
                get(params.colDef, "locale") ?? "en-US",
              )
                ? get(params.colDef, "locale")
                : "en-US"
              const showThousandsSeparator = get(
                params.colDef,
                "showThousandsSeparator",
              )
              if (isNumber(decimalPlaces)) {
                return showThousandsSeparator
                  ? `${Number(
                      Number(params.value * 100).toFixed(decimalPlaces),
                    ).toLocaleString(locale)}%`
                  : `${Number(params.value * 100).toFixed(decimalPlaces)}%`
              } else {
                return showThousandsSeparator
                  ? `${Number(params.value * 100).toLocaleString(locale)}%`
                  : `${params.value * 100}%`
              }
            },
          }
        case "html":
        case "markdown":
          return {
            ...column,
            type: "string",
            renderCell: (params: GridRenderCellParams) => {
              return (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    rehypeRaw,
                    [
                      rehypeSanitize,
                      {
                        allowedTags: HTMLTags,
                      },
                    ],
                  ]}
                  components={{
                    a: ({ href, children }) => (
                      <Link href={href} target="_blank" colorScheme="blue">
                        {children}
                      </Link>
                    ),
                    p: ({ children }) => <Paragraph>{children}</Paragraph>,
                  }}
                >
                  {isObject(params.value)
                    ? JSON.stringify(params.value)
                    : params.value}
                </ReactMarkdown>
              )
            },
          }
        case "currency":
          return {
            ...column,
            type: "number",
            renderCell: (params: GridRenderCellParams) => {
              const decimalPlaces = get(params.colDef, "decimalPlaces")
              const locale = isValidLocale(
                get(params.colDef, "locale") ?? "en-US",
              )
                ? get(params.colDef, "locale")
                : "en-US"
              const currencyCode = get(params.colDef, "currencyCode") ?? "USD"
              const showThousandsSeparator = get(
                params.colDef,
                "showThousandsSeparator",
              )
              if (isNumber(decimalPlaces)) {
                return showThousandsSeparator
                  ? `${CurrencyCode[currencyCode] ?? "USD"}${Number(
                      Number(params.value).toFixed(decimalPlaces),
                    ).toLocaleString(locale)}`
                  : `${CurrencyCode[currencyCode ?? "USD"]}${Number(
                      params.value,
                    ).toFixed(decimalPlaces)}`
              } else {
                return showThousandsSeparator
                  ? `${CurrencyCode[currencyCode ?? "USD"]}${Number(
                      params.value,
                    ).toLocaleString(locale)}`
                  : `${CurrencyCode[currencyCode ?? "USD"]}${params.value}`
              }
            },
          }
        case "tag":
          return {
            ...column,
            type: "string",
            renderCell: (params: GridRenderCellParams) => {
              const tagColor = get(params.colDef, "tagColor")
              const tagLabelArray = isArray(params.value)
                ? params.value
                : [params.value]
              const tagColorMap = isObject(tagColor) ? tagColor : {}
              return (
                <Space>
                  {tagLabelArray.map((label, index) => {
                    const l = isObject(label) ? JSON.stringify(label) : label
                    const c = get(tagColorMap, l) ?? getPreColor(getHashCode(l))
                    return (
                      <Tag key={`${l}:${index}`} colorScheme={c}>
                        {l}
                      </Tag>
                    )
                  })}
                </Space>
              )
            },
          }
        case "image":
          return {
            ...column,
            type: "string",
            renderCell: (params: GridRenderCellParams) => {
              const objectFit = get(params.colDef, "objectFit")
              return <Image src={params.value} objectFit={objectFit} />
            },
          }
        case "number":
          return {
            ...column,
            type: "number",
            renderCell: (params: GridRenderCellParams) => {
              const decimalPlaces = get(params.colDef, "decimalPlaces")
              const locale = isValidLocale(
                get(params.colDef, "locale") ?? "en-US",
              )
                ? get(params.colDef, "locale")
                : "en-US"
              const showThousandsSeparator = get(
                params.colDef,
                "showThousandsSeparator",
              )
              if (isNumber(decimalPlaces)) {
                return showThousandsSeparator
                  ? Number(
                      Number(params.value).toFixed(decimalPlaces),
                    ).toLocaleString(locale)
                  : Number(params.value).toFixed(decimalPlaces)
              } else {
                return showThousandsSeparator
                  ? Number(params.value).toLocaleString(locale)
                  : params.value
              }
            },
          }
        case "boolean":
          return {
            ...column,
            type: "boolean",
          }
        case "date":
          return {
            ...column,
            type: "date",
            renderCell: (params: GridRenderCellParams) => {
              return (
                <SingleDatePicker
                  colorScheme="techPurple"
                  editable={false}
                  allowClear={false}
                  value={params.value}
                />
              )
            },
            valueGetter: (params: GridValueGetterParams) => {
              return dayjs(params.value, get(params.colDef, "format")).toDate()
            },
          }
        case "datetime":
          return {
            ...column,
            type: "datetime",
            renderCell: (params: GridRenderCellParams) => {
              return (
                <TimePicker
                  colorScheme="techPurple"
                  editable={false}
                  allowClear={false}
                  value={params.value}
                />
              )
            },
            valueGetter: (params: GridValueGetterParams) => {
              return dayjs(params.value, get(params.colDef, "format")).toDate()
            },
          }
        case "link":
          return {
            ...column,
            type: "string",
            renderCell: (params: GridRenderCellParams) => {
              return (
                <Link href={params.value} target="_blank">
                  {params.value}
                </Link>
              )
            },
          }
      }
    })
  }, [columns])

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
        columns={renderColumns ?? []}
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
    </StyledEngineProvider>
  )
}

DataGridWidget.displayName = "DataGridWidget"
export default DataGridWidget
