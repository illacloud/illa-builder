import { PanelBar } from "@/components/PanelBar"
import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { Setter } from "@/page/App/components/InspectPanel/setter"
import { ghostEmptyStyle } from "@/page/App/components/InspectPanel/style"

export const renderFieldAndLabel = (
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
    />
  )
}

export const renderPanelBar = (
  config: PanelFieldGroupConfig,
  displayName: string,
) => {
  const { id, groupName, children } = config as PanelFieldGroupConfig
  const key = `${id}-${displayName}`

  return (
    <PanelBar key={key} title={groupName}>
      {children && children.length > 0 && (
        <div css={ghostEmptyStyle}>{fieldFactory(children, displayName)}</div>
      )}
    </PanelBar>
  )
}

export const renderField = (
  item: PanelConfig,
  displayName: string,
  isInList: boolean = false,
) => {
  if ((item as PanelFieldGroupConfig).groupName) {
    return renderPanelBar(item as PanelFieldGroupConfig, displayName)
  } else if ((item as PanelFieldConfig).setterType) {
    return renderFieldAndLabel(
      item as PanelFieldConfig,
      displayName,
      isInList,
      "",
    )
  }
  return null
}

export function fieldFactory(panelConfig: PanelConfig[], displayName: string) {
  if (!displayName || !panelConfig || !panelConfig.length) return null
  return panelConfig.map((item: PanelConfig) =>
    renderField(item, displayName, false),
  )
}
