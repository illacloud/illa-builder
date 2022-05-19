import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "../interface"
import PanelBar from "../bar"
import Setter from "../setter"

export const renderFieldAndLabel = (
  config: PanelFieldConfig,
  componentId: string,
  isInList: boolean = false,
) => {
  const { id } = config
  return <Setter key={`${id}-${componentId}`} {...config} isInList={isInList} />
}

export const renderPanelBar = (
  config: PanelFieldGroupConfig,
  componentId: string,
) => {
  const { id, groupName, children } = config as PanelFieldGroupConfig
  return (
    <PanelBar
      key={`${id}-${groupName}-${componentId}`}
      title={groupName}
      isOpened
    >
      {children && children.length > 0 && fieldFactory(children, componentId)}
    </PanelBar>
  )
}

export const renderField = (
  item: PanelConfig,
  componentId: string,
  isInList: boolean = false,
) => {
  if ((item as PanelFieldGroupConfig).groupName) {
    return renderPanelBar(item as PanelFieldGroupConfig, componentId)
  } else if ((item as PanelFieldConfig).setterType) {
    return renderFieldAndLabel(item as PanelFieldConfig, componentId, isInList)
  }
  return null
}

export function fieldFactory(panelConfig: PanelConfig[], componentId: string) {
  if (!componentId || !panelConfig || !panelConfig.length) return null
  return panelConfig.map((item: PanelConfig) => renderField(item, componentId))
}
