import { get, isEqual } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { tansTableDataToColumns } from "@/widgetLibrary/TableWidget/utils"
import { TableDataInputSetterProps } from "./interface"

export const TableDataInputSetter: FC<TableDataInputSetterProps> = (props) => {
  const {
    widgetDisplayName,
    attrName,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
    value,
    placeholder,
    isInList,
    handleUpdateMultiAttrDSL,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const columns = useMemo(() => {
    return get(targetComponentProps, "columns", [])
  }, [targetComponentProps])

  const handleUpdateDsl = useCallback(
    (attrName: string, newValue: any) => {
      try {
        const data = evaluateDynamicString("", newValue, BUILDER_CALC_CONTEXT)
        if (Array.isArray(data)) {
          let newColumns = tansTableDataToColumns(data)
          if (!isEqual(newColumns, columns)) {
            handleUpdateMultiAttrDSL?.({
              columns: newColumns,
              [attrName]: newValue,
            })
            return
          }
        }
      } catch {}
      handleUpdateMultiAttrDSL?.({
        [attrName]: newValue,
      })
    },
    [columns, handleUpdateMultiAttrDSL],
  )

  return (
    <BaseInput
      attrName={attrName}
      handleUpdateDsl={handleUpdateDsl}
      value={value}
      placeholder={placeholder}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetOrAction={widgetOrAction}
      widgetType={widgetType}
      isInList={isInList}
      isSetterSingleRow={isSetterSingleRow}
    />
  )
}

TableDataInputSetter.displayName = "TableDataInputSetter"
