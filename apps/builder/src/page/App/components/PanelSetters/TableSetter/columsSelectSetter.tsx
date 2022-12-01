import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { ColumnsSelectSetterProps, SelectOptions } from "./interface"

export const ColumnsSelectSetter: FC<ColumnsSelectSetterProps> = (props) => {
  const {
    widgetDisplayName,
    attrName,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
    allowClear,
    value,
    handleUpdateMultiAttrDSL,
    ...otherProps
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const options = useMemo(() => {
    const columns = get(targetComponentProps, "columns", [])
    const opt: SelectOptions = []
    columns.map((item: ColumnItemShape) => {
      opt.push({
        value: item.accessorKey,
        label: item.header,
      })
    })
    return opt
  }, [targetComponentProps])

  const handleUpdateDsl = useCallback(
    (attrName: string, newValue: any) => {
      handleUpdateMultiAttrDSL?.({
        [attrName]: newValue,
      })
    },
    [handleUpdateMultiAttrDSL],
  )

  return (
    <BaseSelectSetter
      {...otherProps}
      isSetterSingleRow={isSetterSingleRow}
      options={options}
      attrName={attrName}
      handleUpdateDsl={handleUpdateDsl}
      value={value}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetOrAction={widgetOrAction}
      widgetType={widgetType}
      allowClear={allowClear}
    />
  )
}

ColumnsSelectSetter.displayName = "ColumnsSelectSetter"
