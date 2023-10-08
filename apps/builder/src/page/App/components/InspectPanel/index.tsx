import { FC } from "react"
import { useSelector } from "react-redux"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { EmptySelected } from "./components/EmptySelected"
import MultiSelectedPanel from "./components/MultiSelectedPanel/multiSelectedPanel"
import SingleSelectedPanel from "./components/SingleSelectedPanel/singleSelectedPanel"

const InspectPanel: FC = () => {
  const selectedComponentsDisplayNames = useSelector(
    getSelectedComponentDisplayNames,
  )

  return selectedComponentsDisplayNames.length === 0 ? (
    <EmptySelected />
  ) : selectedComponentsDisplayNames.length > 1 ? (
    <MultiSelectedPanel />
  ) : (
    <SingleSelectedPanel />
  )
}

InspectPanel.displayName = "InspectPanel"
export default InspectPanel
