import { FC, useMemo } from "react"
import { SelectedPanelProps } from "@/page/App/components/InspectPanel/interface"
import { MultiSelectedPanel } from "@/page/App/components/InspectPanel/multiSelectedPanel"
import { SingleSelectedPanel } from "@/page/App/components/InspectPanel/singleSelectedPanel"

export const SelectedPanel: FC<SelectedPanelProps> = (props) => {
  const { selectedDisplayNames } = props

  const isMulti = useMemo(
    () => selectedDisplayNames.length > 1,
    [selectedDisplayNames],
  )
  return isMulti ? <MultiSelectedPanel /> : <SingleSelectedPanel />
}

SelectedPanel.displayName = "SelectedPanel"
