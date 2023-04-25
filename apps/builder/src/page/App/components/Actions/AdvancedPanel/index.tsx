import { FC } from "react"
import { AdvancedPanelSpace } from "./Components/Space"
import { AdvancedOptionSetting } from "./Model/AdvancedOption"
import { TimingSetting } from "./Model/Timing"
import { advancedPanelStyle } from "./style"

export const AdvancedPanel: FC = () => {
  return (
    <div css={advancedPanelStyle}>
      <AdvancedPanelSpace />
      <TimingSetting />
      <AdvancedPanelSpace />
      <AdvancedOptionSetting />
    </div>
  )
}
