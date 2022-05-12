import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "../interface"
import PanelField from "../field"
import PanelBar from "../bar"

const renderFieldGroup = (fieldGroup: PanelFieldGroupConfig) => {
  const { id, isOpened, groupName, children } = fieldGroup
  return (
    <PanelBar key={id} title={groupName} isOpened={isOpened}>
      {children && children.length > 0 && fieldFactory(children)}
    </PanelBar>
  )
}

export function fieldFactory(panelConfig: PanelConfig[]) {
  if (!panelConfig || !panelConfig.length) return null
  return panelConfig.map((item: PanelConfig) => {
    if ((item as PanelFieldGroupConfig).groupName) {
      return renderFieldGroup(item as PanelFieldGroupConfig)
    } else if ((item as PanelFieldConfig).setterType) {
      const { id, setterType, attrName, labelName, labelDesc } =
        item as PanelFieldConfig

      return (
        <PanelField
          key={id}
          id={id}
          setterType={setterType}
          attrName={attrName}
          labelName={labelName}
          labelDesc={labelDesc}
        />
      )
    }
    return null
  })
}
