import { debounce, get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { BaseDynamicSelect } from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { TableDataSourceSetterProps } from "@/page/App/components/PanelSetters/TableSetter/interface"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  getActionExecutionResult,
  getExecutionError,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { tansTableDataToColumns } from "@/widgetLibrary/TableWidget/utils"

export const TableDataSourceSelectSetter: FC<TableDataSourceSetterProps> = (
  props,
) => {
  const {
    widgetDisplayName,
    labelName,
    labelDesc,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
  } = props

  const actions = useSelector(getActionList)
  const actionExecutionResult = useSelector(getActionExecutionResult)
  const isError = useSelector<RootState, boolean>((state) => {
    const errors = getExecutionError(state)
    const thisError = get(errors, `${widgetDisplayName}.dataSource`)
    return thisError?.length > 0
  })
  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      return searchDSLByDisplayName(widgetDisplayName, rootState)?.props || {}
    },
  )

  const customColumns = useMemo(() => {
    const columns = get(targetComponentProps, "columns", [])
    return columns.filter((item: any) => item.custom)
  }, [targetComponentProps])

  const isDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "dataSourceMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const finalValue = useMemo(() => {
    if (isDynamic) {
      return get(targetComponentProps, "dataSourceJS")
    } else {
      return get(targetComponentProps, "dataSource")
    }
  }, [isDynamic, targetComponentProps])

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

  const handleChangeInput = useCallback(
    (value: string) => {
      const data = evaluateDynamicString("", value, actionExecutionResult)
      if (Array.isArray(data)) {
        let newColumns = tansTableDataToColumns(data)
        if (newColumns?.length) {
          handleUpdateMultiAttrDSL?.({
            columns: newColumns.concat(customColumns),
            dataSourceJS: value,
          })
          return
        }
      }
      handleUpdateDsl("dataSourceJS", value)
    },
    [
      actionExecutionResult,
      customColumns,
      handleUpdateDsl,
      handleUpdateMultiAttrDSL,
    ],
  )

  const debounceHandleChangeInput = debounce(handleChangeInput, 300)

  const handleChangeSelect = useCallback(
    (value: any) => {
      handleUpdateMultiAttrDSL?.({
        dataSource: value,
      })
    },
    [handleUpdateMultiAttrDSL],
  )

  return (
    <div css={publicPaddingStyle}>
      <BaseDynamicSelect
        isDynamic={isDynamic}
        onClickFxButton={handleClickFxButton}
        selectPlaceholder="Select a query or transformer"
        inputPlaceholder="{{}}"
        onChangeInput={debounceHandleChangeInput}
        path={`${widgetDisplayName}.dataSourceJS`}
        options={selectedOptions}
        expectedType={VALIDATION_TYPES.OBJECT}
        onChangeSelect={handleChangeSelect}
        value={finalValue}
        labelName={labelName}
        labelDesc={labelDesc}
        isError={isError}
      />
    </div>
  )
}

TableDataSourceSelectSetter.displayName = "TableDataSourceSelectSetter"
