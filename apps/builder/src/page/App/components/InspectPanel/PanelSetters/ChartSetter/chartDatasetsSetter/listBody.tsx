import { FC } from "react"
import { ListBodyProps } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { ListItem } from "./listItem"

export const ListBody: FC<ListBodyProps> = (props) => {
  const { datasets } = props
  return (
    <>
      {datasets?.map((dataset, index) => {
        return (
          <ListItem
            index={index}
            key={dataset.id}
            color={dataset.color}
            isHidden={dataset.isHidden}
            datasetMethod={dataset.aggregationMethod}
            datasetName={dataset.datasetName}
          />
        )
      })}
    </>
  )
}
