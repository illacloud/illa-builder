import { FC } from "react"
import { Trigger } from "@illa-design/react"
import { GuidePoint } from "@/components/Guide/GuidePoint"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { triggerStyle } from "@/components/Guide/GuidePopover/style"
import { GUIDE_STEP } from "@/config/guide/config"
import RenderPanelSetter from "../PanelSetter"
import { RenderGuideModePanelSetterProps } from "./interface"

const RenderGuideModePanelSetter: FC<RenderGuideModePanelSetterProps> = (
  props,
) => {
  const { config, displayName, parentAttrName, currentStep } = props
  const { id } = config
  const currentStepInfo = GUIDE_STEP[currentStep]
  const { hideTrigger, titleKey, descKey, selector, doItForMe } =
    currentStepInfo

  if (selector === id) {
    if (hideTrigger) {
      return (
        <div key={`${id}-${displayName}`} style={{ position: "relative" }}>
          <GuidePoint />
          <RenderPanelSetter
            config={config}
            displayName={displayName}
            parentAttrName={parentAttrName}
          />
        </div>
      )
    }
    return (
      <Trigger
        _css={triggerStyle}
        key={`${id}-${displayName}`}
        popupVisible={true}
        trigger="hover"
        content={
          <GuidePopover
            title={titleKey}
            description={descKey}
            onClickDoIt={doItForMe}
          />
        }
        position="bottom"
        colorScheme="techPurple"
      >
        <div style={{ position: "relative" }}>
          <GuidePoint />
          <RenderPanelSetter
            config={config}
            displayName={displayName}
            parentAttrName={parentAttrName}
          />
        </div>
      </Trigger>
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

RenderGuideModePanelSetter.displayName = "RenderGuideModePanelSetter"

export default RenderGuideModePanelSetter
