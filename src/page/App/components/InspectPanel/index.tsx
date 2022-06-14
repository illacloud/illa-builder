import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { SelectedPanel } from "./selectedPanel"
import { Empty } from "./empty"
import { getSelectedComponentsDisplayName } from "@/redux/currentApp/config/configSelector"

export const InspectPanel: FC = () => {
  const selectedComponentsDisplayNames = useSelector(
    getSelectedComponentsDisplayName,
  )

  const isNotSelected = useMemo(() => {
    return selectedComponentsDisplayNames.length === 0
  }, [selectedComponentsDisplayNames])

  return isNotSelected ? (
    <Empty />
  ) : (
    <SelectedPanel selectedDisplayNames={selectedComponentsDisplayNames} />
  )
}

InspectPanel.displayName = "InspectPanel"
