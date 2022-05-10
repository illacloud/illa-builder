import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "../interface"
import { Collapse } from "@illa-design/collapse"

const CollapseItem = Collapse.Item

const getActiveKeys = (panelConfig: PanelConfig[]) => {
  return (
    panelConfig
      .filter((item) => (item as PanelFieldGroupConfig).isOpened !== false)
      .map((item) => (item as PanelFieldGroupConfig).groupName) ?? []
  )
}

const renderFieldGroup = (
  fieldGroup: PanelFieldGroupConfig,
  activeKeys: string[],
) => {
  const { id } = fieldGroup
  return (
    <Collapse expandIconPosition="right" defaultActiveKey={activeKeys} key={id}>
      <CollapseItem header={fieldGroup.groupName} name={fieldGroup.groupName}>
        {fieldGroup.children &&
          fieldGroup.children.length > 0 &&
          fieldFactory(fieldGroup.children)}
      </CollapseItem>
    </Collapse>
  )
}

export function fieldFactory(panelConfig: PanelConfig[]) {
  if (!panelConfig || !panelConfig.length) return null
  const activeKeys = getActiveKeys(panelConfig)
  return panelConfig.map((item: PanelConfig) => {
    if ((item as PanelFieldGroupConfig).groupName) {
      return renderFieldGroup(item as PanelFieldGroupConfig, activeKeys)
    } else if ((item as PanelFieldConfig).setterType) {
      const { id } = item
      return <div key={id}>{(item as PanelFieldConfig).labelName}</div>
    }
    return null
  })
}
