import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Table } from "@illa-design/table"
import { ColumnItemShape, TableWidgetProps, WrappedTableProps } from "./interface"
import { dayjsPro, isNumber } from "@illa-design/system"

export const WrappedTable = forwardRef<HTMLInputElement, WrappedTableProps>((props, ref) => {
    const { data, loading, emptyState, columns, defaultSort, columnVisibility } = props

    return (
      <Table
        data={data}
        columns={columns}
        loading={loading}
        emptyProps={{ description: emptyState }}
        defaultSort={defaultSort}
        columnVisibility={columnVisibility}
        bordered
        striped
        borderedCell
        pinedHeader
        w="100%"
        h="100%"
      />
    )
  },
)

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const {
    data,
    emptyState,
    loading,
    columns,
    displayName,
    defaultSortKey,
    defaultSortOrder,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
  } = props

  const tableWrapperRef = useRef<HTMLDivElement>(null)

  const defaultSort = useMemo(() => {
    if (!defaultSortKey) return undefined
    return [{
      id: defaultSortKey,
      desc: defaultSortOrder === "descend",
    }]

  }, [defaultSortOrder, defaultSortKey])

  const columnVisibility = useMemo(() => {
    const res: Record<string, boolean> = {}
    columns?.map((item) => {
      const { visible, accessorKey } = item as ColumnItemShape
      if (!visible) {
        res[accessorKey] = false
      }
    })
    return res
  }, [columns])

  const columnsDef = useMemo(() => {
    const res: ColumnItemShape[] = []
    columns?.map((item) => {
      const transItem = JSON.parse(JSON.stringify(item))
      const { type = "text", decimalPlaces = 0, format = "YYYY-MM-DD" } = transItem as ColumnItemShape
      transItem["cell"] = (props: any) => {
        const cellValue = props.getValue()
        switch (type) {
          default:
            return cellValue
          case "text":
            return cellValue
          case "number":
            const formatVal = Number(cellValue)
            return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
          case "percent":
            const percentVal = Number(cellValue)
            return isNumber(percentVal) ? `${(percentVal * 100).toFixed(decimalPlaces)}%` : "-"
          case "date":
            const dayVal = dayjsPro(cellValue).format(format)
            return dayVal ? dayVal : "-"
        }
      }
      res.push(transItem)
    })
    return res
  }, [columns])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      defaultSort,
      columns,
      data,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    defaultSort,
    columns,
    data,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  useEffect(() => {
    if (tableWrapperRef.current) {
      updateComponentHeight(tableWrapperRef.current?.clientHeight)
    }
  }, [
    data,
  ])

  return <div ref={tableWrapperRef}>
    <WrappedTable data={data} emptyState={emptyState} loading={loading} columns={columnsDef}
                  columnVisibility={columnVisibility}
                  defaultSort={defaultSort} />
  </div>
}
