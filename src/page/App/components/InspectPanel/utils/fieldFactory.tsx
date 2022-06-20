import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { PanelBar } from "@/page/App/components/InspectPanel/bar"
import { Setter } from "@/page/App/components/InspectPanel/setter"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"

export const renderFieldAndLabel = (
  config: PanelFieldConfig,
  displayName: string,
  isInList: boolean = false,
) => {
  const { id } = config
  return <Setter key={`${id}-${displayName}`} {...config} isInList={isInList} />
}

export const renderPanelBar = (config: PanelFieldGroupConfig, displayName: string) => {
  const { id, groupName, children } = config as PanelFieldGroupConfig
  let isOpened = true
  const key = `${id}-${displayName}`

  const saveToggleState = (value: boolean) => {
    setLocalStorage(key, value, -1)
  }

  if (getLocalStorage(key) != undefined) {
    isOpened = getLocalStorage(key)
  } else {
    saveToggleState(isOpened)
  }

  return (
    <PanelBar
      key={key}
      title={groupName}
      isOpened={isOpened}
      saveToggleState={saveToggleState}
    >
      {children && children.length > 0 && fieldFactory(children, displayName)}
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
    return renderFieldAndLabel(item as PanelFieldConfig, displayName, isInList)
  }
  return null
}

export function fieldFactory(panelConfig: PanelConfig[], displayName: string) {
  if (!displayName || !panelConfig || !panelConfig.length) return null
  return panelConfig.map((item: PanelConfig) => renderField(item, displayName))
}
