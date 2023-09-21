import { FC } from "react"
import RenderGuideModePanelSetter from "../GuideModePanelSetter"
import RenderPanelSetter from "../PanelSetter"
import { RenderFieldAndLabelProps } from "./interface"

const RenderFieldAndLabel: FC<RenderFieldAndLabelProps> = (props) => {
  const {
    config,
    displayName,
    parentAttrName,
    guideInfo = { isOpen: false, currentStep: 0 },
  } = props

  if (guideInfo.isOpen) {
    return (
      <RenderGuideModePanelSetter
        config={config}
        displayName={displayName}
        parentAttrName={parentAttrName}
        currentStep={guideInfo.currentStep}
      />
    )
  }

  return (
    <RenderPanelSetter
      config={config}
      displayName={displayName}
      parentAttrName={parentAttrName}
    />
  )
}

RenderFieldAndLabel.displayName = "RenderFieldAndLabel"

export default RenderFieldAndLabel
