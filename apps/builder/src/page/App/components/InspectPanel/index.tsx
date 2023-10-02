import { FC } from "react"
import { useSelector } from "react-redux"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { EmptySelected } from "./components/EmptySelected"
import { SelectedPanel } from "./selectedPanel"

const InspectPanel: FC = () => {
  const selectedComponentsDisplayNames = useSelector(
    getSelectedComponentDisplayNames,
  )

  const isNotSelected = selectedComponentsDisplayNames.length === 0

  return isNotSelected ? (
    <EmptySelected />
  ) : (
    <SelectedPanel selectedDisplayNames={selectedComponentsDisplayNames} />
  )
}

InspectPanel.displayName = "InspectPanel"
export default InspectPanel
