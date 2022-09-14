import { FC, useCallback, useMemo } from "react"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { BaseDynamicSelect } from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { useSelector } from "react-redux"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { debounce, get } from "lodash"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ChartXAxisSetter: FC<ChartDataSourceSetterProps> = props => {
  const { handleUpdateDsl, widgetDisplayName, labelName, labelDesc } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    rootState => {
      return searchDSLByDisplayName(widgetDisplayName, rootState)?.props || {}
    },
  )

  const isDataSourceDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "dataSourceMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const dataSources = useMemo(() => {
    if (isDataSourceDynamic) {
      return get(targetComponentProps, "dataSourceJS", {})
    }
    return get(targetComponentProps, "dataSource", {})
  }, [isDataSourceDynamic, targetComponentProps])

  const isDynamic = useMemo(() => {
    const xAsisMode = get(targetComponentProps, "xAsisMode", "select")
    return xAsisMode === "dynamic"
  }, [targetComponentProps])

  const finalValue = useMemo(() => {
    if (isDynamic) {
      return get(targetComponentProps, "xAsis")
    } else {
      return get(targetComponentProps, "xAsisJS")
    }
  }, [isDynamic, targetComponentProps])

  const selectedOptions = useMemo(() => {
    return Object.keys(dataSources).map(key => key)
  }, [dataSources])

  const handleClickFxButton = useCallback(() => {
    const isInOption = selectedOptions.some(option => option === finalValue)
    if (isDynamic) {
      handleUpdateDsl("xAsisMode", "select")
      if (!isInOption) {
        handleUpdateDsl("xAsis", "")
      } else {
        handleUpdateDsl("xAsis", finalValue)
      }
    } else {
      handleUpdateDsl("xAsisMode", "dynamic")
      if (isInOption) {
        handleUpdateDsl("xAsisJS", finalValue)
      }
    }
  }, [finalValue, handleUpdateDsl, isDynamic, selectedOptions])

  const handleChangeInput = useCallback(
    (value: string) => {
      handleUpdateDsl("xAsisJS", value)
    },
    [handleUpdateDsl],
  )

  const debounceHandleChangeInput = debounce(handleChangeInput, 300)

  const handleChangeSelect = useCallback(
    (value: any) => {
      handleUpdateDsl("xAsis", value)
    },
    [handleUpdateDsl],
  )

  return (
    <BaseDynamicSelect
      isDynamic={isDynamic}
      onClickFxButton={handleClickFxButton}
      selectPlaceholder="Select a query or transformer"
      inputPlaceholder="{{}}"
      onChangeInput={debounceHandleChangeInput}
      path={`${widgetDisplayName}.xAxisJS`}
      options={selectedOptions}
      expectedType={VALIDATION_TYPES.OBJECT}
      onChangeSelect={handleChangeSelect}
      value={finalValue}
      labelName={labelName}
      labelDesc={labelDesc}
      isError={false}
    />
  )
}

ChartXAxisSetter.displayName = "ChartXAxisSetter"
