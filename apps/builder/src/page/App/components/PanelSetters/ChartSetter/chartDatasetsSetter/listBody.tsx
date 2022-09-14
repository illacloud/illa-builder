import { FC } from "react"
import { ListItem } from "./listItem"

export const ListBody: FC = () => {
  return (
    <>
      <ListItem
        color="orange-tone"
        isHidden={false}
        datasetMethod="SUM"
        datasetName="DatasetName1"
      />
      <ListItem
        color="#FAC819"
        isHidden
        datasetMethod="SUM"
        datasetName="DatasetName2"
      />
    </>
  )
}
