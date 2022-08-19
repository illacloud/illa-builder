import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { SelectedPanel } from "./selectedPanel"
import { EmptySelected } from "./empty"
import { getSelectedComponentsDisplayName } from "@/redux/config/configSelector"

export const InspectPanel: FC = () => {
  const selectedComponentsDisplayNames = useSelector(
    getSelectedComponentsDisplayName,
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
