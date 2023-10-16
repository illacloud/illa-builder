import { FC } from "react"
import { useSelector } from "react-redux"
import { getGuideInfo } from "@/redux/guide/guideSelector"
import RenderGuideModePanelSetter from "../GuideModePanelSetter"
import RenderPanelSetter from "../PanelSetter"
import { RenderFieldAndLabelProps } from "./interface"

const RenderFieldAndLabel: FC<RenderFieldAndLabelProps> = (props) => {
  const { config, displayName, parentAttrName } = props

  const guideInfo = useSelector(getGuideInfo) ?? {
    isOpen: false,
    currentStep: 0,
  }

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
