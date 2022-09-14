import { FC, useCallback, useMemo } from "react"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { BaseDynamicSelect } from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { debounce, get } from "lodash"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { formatDataAsObject } from "@/utils/formatData"

export const ChartKeysSelectSetter: FC<ChartDataSourceSetterProps> = props => {
  const {
    handleUpdateDsl,
    widgetDisplayName,
    labelName,
    labelDesc,
    attrName,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    rootState => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const isDataSourceDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "dataSourceMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const dataSources = useMemo(() => {
    let originDataSources = get(targetComponentProps, "dataSource", [])
    if (isDataSourceDynamic) {
      originDataSources = get(targetComponentProps, "dataSourceJS", [])
    }

    return formatDataAsObject(originDataSources)
  }, [isDataSourceDynamic, targetComponentProps])

  const isDynamic = useMemo(() => {
    const xAsisMode = get(targetComponentProps, `${attrName}Mode`, "select")
    return xAsisMode === "dynamic"
  }, [attrName, targetComponentProps])

  const finalValue = useMemo(() => {
    if (isDynamic) {
      return get(targetComponentProps, `${attrName}JS`)
    } else {
      return get(targetComponentProps, `${attrName}`)
    }
  }, [attrName, isDynamic, targetComponentProps])

  const selectedOptions = useMemo(() => {
    return Object.keys(dataSources).map(key => key)
  }, [dataSources])

  const handleClickFxButton = useCallback(() => {
    const isInOption = selectedOptions.some(option => option === finalValue)
    if (isDynamic) {
      handleUpdateDsl(`${attrName}Mode`, "select")
      if (!isInOption) {
        handleUpdateDsl(attrName, "")
      } else {
        handleUpdateDsl(attrName, finalValue)
      }
    } else {
      handleUpdateDsl(`${attrName}Mode`, "dynamic")
      if (isInOption) {
        handleUpdateDsl(`${attrName}JS`, finalValue)
      }
    }
  }, [attrName, finalValue, handleUpdateDsl, isDynamic, selectedOptions])

  const handleChangeInput = useCallback(
    (value: string) => {
      handleUpdateDsl(`${attrName}JS`, value)
    },
    [attrName, handleUpdateDsl],
  )

  const debounceHandleChangeInput = debounce(handleChangeInput, 300)

  const handleChangeSelect = useCallback(
    (value: any) => {
      handleUpdateDsl(attrName, value ?? "")
    },
    [attrName, handleUpdateDsl],
  )

  return (
    <BaseDynamicSelect
      isDynamic={isDynamic}
      onClickFxButton={handleClickFxButton}
      selectPlaceholder="Select a query or transformer"
      inputPlaceholder="{{}}"
      onChangeInput={debounceHandleChangeInput}
      path={`${widgetDisplayName}.${attrName}JS`}
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

ChartKeysSelectSetter.displayName = "ChartXAxisSetter"
