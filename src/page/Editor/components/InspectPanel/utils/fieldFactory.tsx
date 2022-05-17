import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "../interface"
import PanelBar from "../bar"
import Setter from "../setter"

export const renderField = (item: PanelConfig) => {
  if ((item as PanelFieldGroupConfig).groupName) {
    const { id, groupName, children } = item as PanelFieldGroupConfig
    return (
      <PanelBar key={`${id}-${groupName}`} title={groupName} isOpened>
        {children && children.length > 0 && fieldFactory(children)}
      </PanelBar>
    )
  } else if ((item as PanelFieldConfig).type) {
    const { id, labelName, labelDesc, type, attrName, childrenSetter } =
      item as PanelFieldConfig
    return (
      <Setter
        key={id}
        labelName={labelName}
        labelDesc={labelDesc}
        type={type}
        childrenSetter={childrenSetter}
        attrName={attrName}
      />
    )
  }
  return null
}

export function fieldFactory(panelConfig: PanelConfig[]) {
  if (!panelConfig || !panelConfig.length) return null
  return panelConfig.map((item: PanelConfig) => renderField(item))
}
