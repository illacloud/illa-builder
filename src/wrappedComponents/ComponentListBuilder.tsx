import { widgetBuilder, WidgetType, WidgetTypeList } from "./WidgetBuilder"
import {
  ComponentSessionProps,
  TypeMapComponent,
} from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { CardInfo, WidgetConfig } from "./interface"

export type SessionType = keyof typeof sessionTypeMapSessionName

const sessionTypeMapSessionName = {
  BASIC: "Basic",
  COMMON: "Common",
}

const getListItemConfig = (type: WidgetType): WidgetConfig => {
  return widgetBuilder(type).config
}

const translateChildren = (componentConfigs: WidgetConfig[]) => {
  const sessionConfigs: TypeMapComponent = {
    BASIC: [],
    COMMON: [],
  }
  componentConfigs.forEach((item) => {
    const { sessionType = "BASIC", type, displayName } = item
    if (!sessionConfigs[sessionType]) {
      sessionConfigs[sessionType] = []
    }
    const childrenConfig: CardInfo = {
      ...item,
      id: `${sessionType}-${type}-${displayName}`,
    }
    sessionConfigs[sessionType].push(childrenConfig)
  })
  return sessionConfigs
}

export const BuildSessionTypeMapComponentConfig = (): TypeMapComponent => {
  const componentConfigs = WidgetTypeList.map((item) => {
    return getListItemConfig(item) as WidgetConfig
  }) as WidgetConfig[]
  return translateChildren(componentConfigs)
}

export const buildComponentList = (): ComponentSessionProps[] => {
  const configs = BuildSessionTypeMapComponentConfig()
  const keys = Object.keys(configs) as SessionType[]
  return keys.map((key) => {
    return {
      title: sessionTypeMapSessionName[key],
      children: configs[key],
    }
  })
}
