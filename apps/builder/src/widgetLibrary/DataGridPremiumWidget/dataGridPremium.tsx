import { DataGridPremium } from "@mui/x-data-grid-premium"
import { isObject } from "lodash"
import { FC, useMemo } from "react"
import { BaseDataGridProps } from "./interface"

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

  const columns = useMemo(() => {
    if (arrayData.length == 0) {
      return []
    } else {
      return Object.keys(arrayData[0]).map((key) => {
        return {
          field: key,
          headerName: key,
        }
      })
    }
  }, [arrayData])

  return (
    <DataGridPremium rows={arrayData} columns={columns} loading={loading} />
  )
}

DataGridPremiumWidget.displayName = "DataGridPremiumWidget"
export default DataGridPremiumWidget
