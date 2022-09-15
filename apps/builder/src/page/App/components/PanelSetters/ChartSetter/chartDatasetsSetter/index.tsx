import { FC, useCallback, useMemo } from "react"
import { ChartDatasetsSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { AddActionLabel } from "@/page/App/components/PanelSetters/PublicComponent/Label/addActionLabel"
import { ListBody } from "./listBody"
import { DatasetsProvider } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/datasetsContext"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"
import { CHART_TYPE } from "@/widgetLibrary/Chart"
import { generateDatasetItem } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/utils"

export const ChartDatasetsSetter: FC<ChartDatasetsSetterProps> = props => {
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
    rootState => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const chartType = useMemo(() => {
    return get(targetComponentProps, "chartType", CHART_TYPE.BAR)
  }, [targetComponentProps])

  const handleAddDataSet = useCallback(async () => {
    let oldDatasets = Array.isArray(value) ? value : []
    const newDatasetItem = generateDatasetItem(chartType)
    handleUpdateDsl(attrName, [...oldDatasets, newDatasetItem])
  }, [attrName, chartType, handleUpdateDsl, value])

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
