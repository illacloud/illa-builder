import { Divider } from "@illa-design/divider"
import {
  PanelConfig,
  PanelFieldConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { PanelBar } from "@/page/App/components/InspectPanel/bar"
import { Setter } from "@/page/App/components/InspectPanel/setter"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
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
  index: number,
) => {
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
  index: number,
) => {
  if ((item as PanelFieldGroupConfig).groupName) {
    return renderPanelBar(item as PanelFieldGroupConfig, displayName, index)
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
  return panelConfig.map((item: PanelConfig, index: number) =>
    renderField(item, displayName, false, index),
  )
}
