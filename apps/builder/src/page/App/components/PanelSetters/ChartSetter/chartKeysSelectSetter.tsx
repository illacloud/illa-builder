import { ChartType } from "chart.js"
import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ChartDatasetShape } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { CHART_PRESET_COLOR } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { formatDataAsObject } from "@/utils/formatData"
import { isObject } from "@/utils/typeHelper"

export const ChartKeysSelectSetter: FC<ChartDataSourceSetterProps> = (
  props,
) => {
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
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const insertValues = useSelector<RootState, Record<string, any>>(
    (rootState) => {
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

  const selectedOptions = useMemo(() => {
    if (!isObject(dataSources)) return []
    let options = Object.keys(dataSources).map((key) => key)
    if (attrName === "groupBy" && value) {
      options.unshift("—")
    }
    return options
  }, [attrName, dataSources, value])

  const datasets: ChartDatasetShape[] = useMemo(() => {
    return get(insertValues, "datasets", [])
  }, [insertValues])

  const generateNewDatasets = useCallback(
    (isGroupBy: boolean) => {
      if (!datasets.length) return []
      if (isGroupBy) {
        return datasets.map((dataset) => {
          return {
            ...dataset,
            color: "illa-preset",
          }
        })
      }
      return datasets.map((dataset, index) => {
        return {
          ...dataset,
          color: CHART_PRESET_COLOR[index % CHART_PRESET_COLOR.length],
        }
      })
    },
    [datasets],
  )

  const handleUpdateDsl = useCallback(
    (attrName: string, newValue: any) => {
      if (attrName === "groupBy") {
        if ((!!value && !newValue) || (!value && !!newValue)) {
          const newDatasets = generateNewDatasets(!!newValue)
          handleUpdateMultiAttrDSL?.({
            datasets: newDatasets,
            [attrName]: newValue === "—" ? undefined : newValue,
          })
        } else {
          handleUpdateMultiAttrDSL?.({
            [attrName]: newValue === "—" ? undefined : newValue,
          })
        }
      } else {
        handleUpdateMultiAttrDSL?.({
          [attrName]: newValue,
        })
      }
    },
    [generateNewDatasets, handleUpdateMultiAttrDSL, value],
  )

  return (
    <BaseSelectSetter
      isSetterSingleRow={isSetterSingleRow}
      options={selectedOptions}
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

ChartKeysSelectSetter.displayName = "ChartXAxisSetter"
