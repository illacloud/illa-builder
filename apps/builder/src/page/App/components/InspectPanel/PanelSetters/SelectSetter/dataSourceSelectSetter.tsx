import { get } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ChartDataSourceSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/interface"
import BaseDynamicSelect from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseDynamicSelect"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const DataSourceSetter: FC<ChartDataSourceSetterProps> = (props) => {
  const { handleUpdateDsl, widgetDisplayName, labelName, labelDesc } = props
  const actions = useSelector(getActionList)
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
      handleUpdateDsl("dataSourceJS", value)
    },
    [handleUpdateDsl],
  )

  const handleChangeSelect = useCallback(
    (value: any) => {
      handleUpdateDsl("dataSource", value)
    },
    [handleUpdateDsl],
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
        isError={isError}
      />
    </div>
  )
}

DataSourceSetter.displayName = "DataSourceSetter"
export default DataSourceSetter
