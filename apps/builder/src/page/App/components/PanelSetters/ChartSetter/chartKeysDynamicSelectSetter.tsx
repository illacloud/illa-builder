import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { ChartDatasetShape } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { CHART_PRESET_COLOR } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import BaseDynamicSelect from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { formatDataAsObject } from "@/utils/formatData"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const ChartKeysDynamicSelectSetter: FC<ChartDataSourceSetterProps> = (
  props,
) => {
  const {
    widgetDisplayName,
    attrName,
    value,
    labelName,
    labelDesc,
    panelConfig,
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

  const isError = useSelector<RootState, boolean>((state) => {
    const errors = getExecutionError(state)
    const thisError = get(errors, `${widgetDisplayName}.${attrName}JS`)
    return thisError?.length > 0
  })

  const isDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "keySelectMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const finalValue = useMemo(() => {
    return get(panelConfig, attrName, "")
  }, [attrName, panelConfig])

  const handleClickFxButton = useCallback(() => {
    const isInOption = selectedOptions.some((value) => value === finalValue)
    if (isDynamic) {
      handleUpdateDsl("keySelectMode", "select")
      if (!isInOption) {
        handleUpdateDsl(attrName, "")
      } else {
        handleUpdateDsl(attrName, finalValue)
      }
    } else {
      handleUpdateDsl("keySelectMode", "dynamic")
      if (isInOption) {
        handleUpdateDsl(attrName, finalValue)
      }
    }
  }, [selectedOptions, isDynamic, finalValue, handleUpdateDsl, attrName])

  const handleChangeSelect = useCallback(
    (value: string) => {
      handleUpdateDsl?.(attrName, value)
    },
    [attrName, handleUpdateDsl],
  )

  const handleChangeInput = useCallback(
    (value: string) => {
      handleUpdateDsl(attrName, value)
    },
    [attrName, handleUpdateDsl],
  )

  return (
    <div css={publicPaddingStyle}>
      <BaseDynamicSelect
        {...props}
        isDynamic={isDynamic}
        options={selectedOptions}
        onClickFxButton={handleClickFxButton}
        onChangeSelect={handleChangeSelect}
        value={finalValue}
        onChangeInput={handleChangeInput}
        expectedType={VALIDATION_TYPES.STRING}
        path={`${widgetDisplayName}.${attrName}`}
        labelName={labelName}
        labelDesc={labelDesc}
        isError={isError}
      />
    </div>
  )
}

ChartKeysDynamicSelectSetter.displayName = "ChartXAxisSetter2"

export default ChartKeysDynamicSelectSetter
