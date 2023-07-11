import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { EmptySelected } from "./empty"
import { SelectedPanel } from "./selectedPanel"

const InspectPanel: FC = () => {
  const selectedComponentsDisplayNames = useSelector(
    getSelectedComponentDisplayNames,
  )

  const isNotSelected = useMemo(() => {
    return selectedComponentsDisplayNames.length === 0
  }, [selectedComponentsDisplayNames])

  return isNotSelected ? (
    <EmptySelected />
  ) : (
    <SelectedPanel selectedDisplayNames={selectedComponentsDisplayNames} />
  )
}

InspectPanel.displayName = "InspectPanel"
export default InspectPanel
