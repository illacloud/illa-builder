import { FC, useCallback } from "react"
import { ChartDatasetsSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { AddActionLabel } from "@/page/App/components/PanelSetters/PublicComponent/Label/addActionLabel"
import { ListBody } from "./listBody"
import { DatasetsProvider } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/datasetsContext"
import { v4 } from "uuid"

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

  const handleAddDataSet = useCallback(async () => {
    let oldDatasets = Array.isArray(value) ? value : []
    const newDatasetItem = {
      id: v4(),
      datasetName: "1",
      datasetValues: "",
      aggregationMethod: "SUM",
      type: "BAR",
      color: "blue",
    }
    handleUpdateDsl(attrName, [...oldDatasets, newDatasetItem])
  }, [attrName, handleUpdateDsl, value])

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
