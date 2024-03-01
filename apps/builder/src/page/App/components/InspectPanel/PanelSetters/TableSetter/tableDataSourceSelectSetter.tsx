import { get, isEqual } from "lodash-es"
import { FC, useCallback, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import BaseDynamicSelect from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseDynamicSelect"
import { TableDataSourceSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/TableSetter/interface"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import {
  tansDataFromOld,
  tansTableDataToColumns,
} from "@/widgetLibrary/TableWidget/utils"

const TableDataSourceSelectSetter: FC<TableDataSourceSetterProps> = (props) => {
  const {
    widgetDisplayName,
    labelName,
    labelDesc,
    detailedDescription,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
  } = props

  const actions = useSelector(getActionList)
  const executionResult = useSelector(getExecutionResult)

  const executionErrors = useSelector(getExecutionError)
  const isError = useMemo(() => {
    return (
      (executionErrors[`${widgetDisplayName}.dataSource`] ?? [])?.length > 0
    )
  }, [executionErrors, widgetDisplayName])

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      return searchDSLByDisplayName(widgetDisplayName, rootState)?.props || {}
    },
  )

  const columns = useMemo(() => {
    return get(targetComponentProps, "columns", []) as ColumnItemShape[]
  }, [targetComponentProps])

  const customColumns = useMemo(() => {
    return columns.filter((item) => item.custom)
  }, [columns])

  const isDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "dataSourceMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const finalValue = useMemo(() => {
    if (isDynamic) {
      return get(targetComponentProps, "dataSourceJS", [])
    } else {
      return get(targetComponentProps, "dataSource", [])
    }
  }, [isDynamic, targetComponentProps])

  useEffect(() => {
    const oldKeyOrder: string[] = []
    const oldKeyMap: Record<string, ColumnItemShape> = {}
    columns?.forEach((item) => {
      oldKeyMap[item.accessorKey] = item
      oldKeyOrder.push(item.accessorKey)
    })
    let data
    try {
      data = evaluateDynamicString("", finalValue, executionResult)
    } catch (e) {}
    if (!Array.isArray(data)) return
    const newColumns = tansDataFromOld(data, oldKeyMap, oldKeyOrder)
    if (newColumns?.length && !isEqual(newColumns, columns)) {
      handleUpdateMultiAttrDSL?.({ columns: newColumns })
    }
  }, [columns, executionResult, finalValue, handleUpdateMultiAttrDSL])

  const selectedOptions = useMemo(() => {
    return actions.map((action) => ({
      label: action.displayName,
      value: `{{${action.displayName}.data}}`,
    }))
  }, [actions])

  const handleClickFxButton = useCallback(() => {
    const isInOption = selectedOptions.some(
      (option) => option.value === finalValue,
    )
    if (isDynamic) {
      handleUpdateDsl("dataSourceMode", "select")
      if (!isInOption) {
        handleUpdateDsl("dataSource", "")
      } else {
        handleUpdateDsl("dataSource", finalValue)
      }
    } else {
      handleUpdateDsl("dataSourceMode", "dynamic")
      if (isInOption) {
        handleUpdateDsl("dataSourceJS", finalValue)
      }
    }
  }, [handleUpdateDsl, isDynamic, selectedOptions, finalValue])

  const getNewColumn = useCallback(
    (value: string) => {
      const data = evaluateDynamicString("", value, executionResult)
      if (Array.isArray(data)) {
        let newColumns = tansTableDataToColumns(data)
        if (newColumns?.length) {
          return newColumns.concat(
            customColumns.map((item: ColumnItemShape, index) => {
              return { ...item, columnIndex: newColumns.length + index }
            }),
          )
        }
      }
    },
    [customColumns, executionResult],
  )

  const handleChangeInput = useCallback(
    (value: string) => {
      const newColumns = getNewColumn(value)
      if (newColumns) {
        handleUpdateMultiAttrDSL?.({
          columns: newColumns,
          dataSourceJS: value,
        })
        return
      }
      handleUpdateMultiAttrDSL?.({
        dataSourceJS: value,
      })
    },
    [getNewColumn, handleUpdateMultiAttrDSL],
  )

  const handleChangeSelect = useCallback(
    (value: any) => {
      const newColumns = getNewColumn(value)
      if (newColumns) {
        handleUpdateMultiAttrDSL?.({
          columns: newColumns,
          dataSource: value,
        })
        return
      }
      handleUpdateMultiAttrDSL?.({
        dataSource: value,
      })
    },
    [getNewColumn, handleUpdateMultiAttrDSL],
  )

  return (
    <div css={publicPaddingStyle}>
      <BaseDynamicSelect
        {...props}
        isDynamic={isDynamic}
        onClickFxButton={handleClickFxButton}
        selectPlaceholder="Select a query or transformer"
        inputPlaceholder="{{}}"
        onChangeInput={handleChangeInput}
        path={`${widgetDisplayName}.dataSourceJS`}
        options={selectedOptions}
        expectedType={VALIDATION_TYPES.ARRAY}
        onChangeSelect={handleChangeSelect}
        value={finalValue}
        labelName={labelName}
        labelDesc={labelDesc}
        detailedDescription={detailedDescription}
        isError={isError}
      />
    </div>
  )
}

TableDataSourceSelectSetter.displayName = "TableDataSourceSelectSetter"
export default TableDataSourceSelectSetter
