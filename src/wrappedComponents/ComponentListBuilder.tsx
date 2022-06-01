import { widgetBuilder, WidgetType, WidgetTypeList } from "./WidgetBuilder"
import {
  ComponentSessionProps,
  TypeMapComponent,
} from "@/page/Editor/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { ComponentModel } from "./interface"

export type SessionType = keyof typeof sessionTypeMapSessionName

const sessionTypeMapSessionName = {
  BASIC: "Basic",
  COMMON: "Common",
}

const getListItemConfig = (type: WidgetType): ComponentModel => {
  return widgetBuilder(type).config
}

const translateChildren = (componentConfigs: ComponentModel[]) => {
  const sessionConfigs: TypeMapComponent = {
    BASIC: [],
    COMMON: [],
  }
  componentConfigs.forEach((item) => {
    const { sessionType = "BASIC", type, widgetName } = item
    if (!sessionConfigs[sessionType]) {
      sessionConfigs[sessionType] = []
    }
    const childrenConfig = {
      ...item,
      id: `${sessionType}-${type}-${widgetName}`,
    }
    sessionConfigs[sessionType].push(childrenConfig)
  })
  return sessionConfigs
}

export const BuildSessionTypeMapComponentConfig = (): TypeMapComponent => {
  const componentConfigs = WidgetTypeList.map((item) => {
    return getListItemConfig(item) as ComponentModel
  }) as ComponentModel[]
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
