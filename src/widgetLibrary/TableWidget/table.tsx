import { FC, useMemo } from "react"
import { Table } from "@illa-design/table"
import {
  TableWidgetProps,
  WrappedTableProps,
} from "@/widgetLibrary/TableWidget/interface"
import { isObject } from "@/utils/typeHelper"

export const WrappedTable: FC<WrappedTableProps> = (props) => {
  const { data, columns } = props
  const tableData = useMemo(() => data, [data])

  const tableColumns = useMemo(() => columns, [columns])
  return <Table data={tableData} columns={tableColumns} />
}

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const { originData } = props
  const formatOriginData = useMemo(() => {
    if (isObject(originData)) {
      const keys = Object.keys(originData)
      const columns: Record<string, any>[] = []
      const datas: Record<string, any>[] = []
      keys.forEach((key) => {
        columns.push({
          Header: key,
          accessor: key,
        })
        // @ts-ignore
        // TODO : @aruseito type error
        if (Array.isArray(originData[key])) {
          // @ts-ignore
          originData[key].forEach((item: any, index: number) => {
            if (datas[index]) {
              const oldData = datas[index]
              datas[index] = { ...oldData, [key]: item }
            } else {
              datas[index] = { [key]: item }
            }
          })
        }
      })

      return { columns, datas }
    }
    if (Array.isArray(originData)) {
      const keysSet = new Set()
      const keys = Object.keys(originData[0])

      keys.forEach((key) => {
        keysSet.add(key)
      })

      const keysArray = Array.from(keysSet)
      const columns: Record<string, any>[] = []
      const datas: Record<string, any>[] = originData
      keysArray.forEach((key) => {
        columns.push({
          Header: key,
          accessor: key,
        })
      })

      return { columns: columns, datas: datas }
    }
    return { columns: [], datas: [] }
  }, [originData])
  const data = useMemo(() => formatOriginData.datas, [formatOriginData])

  const columns = useMemo(() => formatOriginData.columns, [formatOriginData])
  return <WrappedTable data={data} columns={columns} />
}
