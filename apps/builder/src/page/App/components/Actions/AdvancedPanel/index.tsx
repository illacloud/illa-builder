import { FC } from "react"
import { AdvancedPanelSpace } from "./Components/Space"
import { AdvancedOptionSetting } from "./Model/AdvancedOption"
import { TimingSetting } from "./Model/Timing"

export const AdvancedPanel: FC = () => {
  return (
    <div>
      <AdvancedPanelSpace />
      <TimingSetting />
      <AdvancedPanelSpace />
      <AdvancedOptionSetting />
    </div>
  )
}
