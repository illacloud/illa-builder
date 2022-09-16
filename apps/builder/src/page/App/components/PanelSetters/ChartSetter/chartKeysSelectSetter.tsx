import { FC, useMemo } from "react"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { get } from "lodash"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { formatDataAsObject } from "@/utils/formatData"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { isObject } from "@/utils/typeHelper"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"

export const ChartKeysSelectSetter: FC<ChartDataSourceSetterProps> = props => {
  const {
    handleUpdateDsl,
    widgetDisplayName,
    attrName,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    rootState => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const insertValues = useSelector<RootState, Record<string, any>>(
    rootState => {
      const targetComponentNode = searchDsl(
        getCanvas(rootState),
        widgetDisplayName,
      )
      if (!targetComponentNode) return {}
      return targetComponentNode.props || {}
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

  const finalValue = useMemo(() => {
    return get(insertValues, attrName)
  }, [attrName, insertValues])

  const selectedOptions = useMemo(() => {
    if (!isObject(dataSources)) return []
    return Object.keys(dataSources).map(key => key)
  }, [dataSources])

  return (
    <BaseSelectSetter
      isSetterSingleRow={isSetterSingleRow}
      options={selectedOptions}
      attrName={attrName}
      handleUpdateDsl={handleUpdateDsl}
      value={finalValue}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetOrAction={widgetOrAction}
      widgetType={widgetType}
    />
  )
}

ChartKeysSelectSetter.displayName = "ChartXAxisSetter"
