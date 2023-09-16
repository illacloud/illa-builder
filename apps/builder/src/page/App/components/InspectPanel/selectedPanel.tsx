import { FC } from "react"
import { SelectedPanelProps } from "@/page/App/components/InspectPanel/interface"
import MultiSelectedPanel from "@/page/App/components/InspectPanel/multiSelectedPanel"
import SingleSelectedPanel from "@/page/App/components/InspectPanel/singleSelectedPanel"

export const SelectedPanel: FC<SelectedPanelProps> = (props) => {
  const { selectedDisplayNames } = props

  const isMulti = selectedDisplayNames.length > 1
  return isMulti ? <MultiSelectedPanel /> : <SingleSelectedPanel />
}

SelectedPanel.displayName = "SelectedPanel"
