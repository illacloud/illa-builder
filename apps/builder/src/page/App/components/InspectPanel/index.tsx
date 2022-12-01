import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getSelectedComponents } from "@/redux/config/configSelector"
import { EmptySelected } from "./empty"
import { SelectedPanel } from "./selectedPanel"

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
