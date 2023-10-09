import { DataGridPremium, LicenseInfo } from "@mui/x-data-grid-premium"
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef"
import { isObject } from "lodash"
import { FC, useMemo } from "react"
import { BaseDataGridProps } from "./interface"

LicenseInfo.setLicenseKey(import.meta.env.ILLA_MUI_LICENSE)

export const DataGridPremiumWidget: FC<BaseDataGridProps> = (props) => {
  const { loading, dataSource, dataSourceJS, dataSourceMode } = props

  const rawData = useMemo(() => {
    return dataSourceMode === "dynamic" ? dataSourceJS : dataSource
  }, [dataSource, dataSourceJS, dataSourceMode])

  const arrayData: object[] = useMemo(() => {
    if (rawData === undefined) {
      return []
    }
    if (Array.isArray(rawData)) {
      if (rawData.length === 0) {
        return []
      } else {
        if (isObject(rawData[0])) {
          return rawData
        } else {
          return rawData.map((item) => {
            return {
              field: item,
            }
          })
        }
      }
    } else {
      if (isObject(rawData)) {
        return [rawData]
      } else {
        return [
          {
            field: rawData,
          },
        ]
      }
    }
  }, [rawData])

  const columns: GridColDef<object>[] = useMemo(() => {
    if (arrayData.length == 0) {
      return []
    } else {
      return Object.keys(arrayData[0]).map((key) => {
        return {
          field: key,
          minWidth: 100,
          headerName: key,
        }
      })
    }
  }, [arrayData])

  console.log("longbo", arrayData, columns)

  return (
    <DataGridPremium rows={arrayData} columns={columns} loading={loading} />
  )
}

DataGridPremiumWidget.displayName = "DataGridPremiumWidget"
export default DataGridPremiumWidget
