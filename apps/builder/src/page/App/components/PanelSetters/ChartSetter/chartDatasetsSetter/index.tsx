import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { DatasetsProvider } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/datasetsContext"
import { ChartDatasetsSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { generateDatasetItem } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/utils"
import { AddActionLabel } from "@/page/App/components/PanelSetters/PublicComponent/Label/addActionLabel"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ListBody } from "./listBody"

export const ChartDatasetsSetter: FC<ChartDatasetsSetterProps> = (props) => {
  const {
    value,
    childrenSetter,
    handleUpdateDsl,
    attrName,
    widgetDisplayName,
    labelName,
    labelDesc,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const isCanGroupBy = useMemo(() => {
    return !!get(targetComponentProps, "groupBy", "")
  }, [targetComponentProps])

  const chartType = useMemo(() => {
    return get(targetComponentProps, "chartType", "bar")
  }, [targetComponentProps])

  const hasColor = useMemo(() => {
    if (!Array.isArray(value)) return []
    return value.map((v) => v.color)
  }, [value])

  const hasDatasetNames = useMemo(() => {
    if (!Array.isArray(value)) return []
    return value.map((v) => v.datasetName)
  }, [value])

  const handleAddDataSet = useCallback(async () => {
    let oldDatasets = Array.isArray(value) ? value : []
    const newDatasetItem = generateDatasetItem(
      chartType,
      isCanGroupBy,
      hasColor,
      hasDatasetNames,
    )
    handleUpdateDsl(attrName, [...oldDatasets, newDatasetItem])
  }, [
    attrName,
    chartType,
    handleUpdateDsl,
    hasColor,
    hasDatasetNames,
    isCanGroupBy,
    value,
  ])

  if (
    !childrenSetter ||
    !Array.isArray(childrenSetter) ||
    childrenSetter.length < 1
  )
    return null

  return (
    <DatasetsProvider
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
      widgetDisplayName={widgetDisplayName}
      childrenSetter={childrenSetter}
      datasets={value}
    >
      <div css={publicPaddingStyle}>
        <AddActionLabel
          labelName={labelName}
          labelDesc={labelDesc}
          handleAddItem={handleAddDataSet}
        />
        <ListBody datasets={value} />
      </div>
    </DatasetsProvider>
  )
}

ChartDatasetsSetter.displayName = "ChartDatasetsSetter"
