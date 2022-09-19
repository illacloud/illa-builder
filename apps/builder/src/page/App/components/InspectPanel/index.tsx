import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { SelectedPanel } from "./selectedPanel"
import { EmptySelected } from "./empty"
import { getSelectedComponents } from "@/redux/config/configSelector"

export const InspectPanel: FC = () => {
  const selectedComponentsDisplayNames = useSelector(getSelectedComponents)

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
