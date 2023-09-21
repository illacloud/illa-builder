import { FC } from "react"
import MultiSelectedPanel from "@/page/App/components/InspectPanel/components/MultiSelectedPanel/multiSelectedPanel"
import SingleSelectedPanel from "@/page/App/components/InspectPanel/components/SingleSelectedPanel/singleSelectedPanel"
import { SelectedPanelProps } from "@/page/App/components/InspectPanel/interface"

export const SelectedPanel: FC<SelectedPanelProps> = (props) => {
  const { selectedDisplayNames } = props

  const isMulti = selectedDisplayNames.length > 1
  return isMulti ? <MultiSelectedPanel /> : <SingleSelectedPanel />
}

SelectedPanel.displayName = "SelectedPanel"
