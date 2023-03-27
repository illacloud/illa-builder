import { get } from "lodash"
import { Trigger } from "@illa-design/react"
import { GuidePoint } from "@/components/Guide/GuidePoint"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { triggerStyle } from "@/components/Guide/GuidePopover/style"
import { PanelBar } from "@/components/PanelBar"
import { GUIDE_STEP } from "@/config/guide/config"
import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { Setter } from "@/page/App/components/InspectPanel/setter"
import { ghostEmptyStyle } from "@/page/App/components/InspectPanel/style"
import { Guide } from "@/redux/guide/guideState"

export const renderPanelSetter = (
  config: PanelFieldConfig,
  displayName: string,
  isInList: boolean = false,
  parentAttrName: string,
) => {
  const { id } = config
  return (
    <Setter
      key={`${id}-${displayName}`}
      {...config}
      isInList={isInList}
      parentAttrName={parentAttrName}
      displayName={displayName}
    />
  )
}

export const renderGuideModePanelSetter = (
  config: PanelFieldConfig,
  displayName: string,
  isInList: boolean,
  parentAttrName: string,
  currentStep: number,
) => {
  const { id } = config
  const currentStepInfo = GUIDE_STEP[currentStep]
  const { hideTrigger, titleKey, descKey, selector, doItForMe } =
    currentStepInfo

  if (selector === id) {
    if (hideTrigger) {
      return (
        <div style={{ position: "relative" }}>
          <GuidePoint />
          {renderPanelSetter(config, displayName, isInList, parentAttrName)}
        </div>
      )
    }
    return (
      <Trigger
        _css={triggerStyle}
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
          {renderPanelSetter(config, displayName, isInList, parentAttrName)}
        </div>
      </Trigger>
    )
  }
  return renderPanelSetter(config, displayName, isInList, parentAttrName)
}

export const renderFieldAndLabel = (
  config: PanelFieldConfig,
  displayName: string,
  isInList: boolean = false,
  parentAttrName: string,
  guideInfo: Guide = { isOpen: false, currentStep: 0 },
) => {
  if (guideInfo.isOpen) {
    return renderGuideModePanelSetter(
      config,
      displayName,
      isInList,
      parentAttrName,
      guideInfo.currentStep,
    )
  }
  return renderPanelSetter(config, displayName, isInList, parentAttrName)
}

export const renderPanelBar = (
  config: PanelFieldGroupConfig,
  displayName: string,
  widgetProps: Record<string, any>,
  guideInfo: Guide,
) => {
  const { id, groupName, children } = config as PanelFieldGroupConfig
  const key = `${id}-${displayName}`
  return (
    <PanelBar key={key} title={groupName}>
      {children && children.length > 0 && (
        <div css={ghostEmptyStyle}>
          {fieldFactory(children, displayName, widgetProps, guideInfo)}
        </div>
      )}
    </PanelBar>
  )
}

export const canRenderField = (
  item: PanelFieldConfig,
  displayName: string,
  widgetProps: Record<string, any>,
) => {
  const { bindAttrName, shown } = item
  if (!bindAttrName || !shown) return true
  if (Array.isArray(bindAttrName)) {
    const values = bindAttrName.map((bindAttrNameItem) =>
      get(widgetProps, bindAttrNameItem),
    )
    return shown(...values)
  }

  return true
}

export const renderField = (
  item: PanelConfig,
  displayName: string,
  isInList: boolean = false,
  widgetProps: Record<string, any>,
  guideInfo: Guide,
) => {
  const canRender = canRenderField(
    item as PanelFieldConfig,
    displayName,
    widgetProps,
  )
  if (!canRender) {
    return null
  }
  if ((item as PanelFieldGroupConfig).groupName) {
    return renderPanelBar(
      item as PanelFieldGroupConfig,
      displayName,
      widgetProps,
      guideInfo,
    )
  } else if ((item as PanelFieldConfig).setterType) {
    return renderFieldAndLabel(
      item as PanelFieldConfig,
      displayName,
      isInList,
      "",
      guideInfo,
    )
  }
  return null
}

export function fieldFactory(
  panelConfig: PanelConfig[],
  displayName: string,
  widgetProps: Record<string, any>,
  guideInfo: Guide,
) {
  if (!displayName || !panelConfig || !panelConfig.length) return null
  return panelConfig.map((item: PanelConfig) =>
    renderField(item, displayName, false, widgetProps, guideInfo),
  )
}
