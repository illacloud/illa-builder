import i18n from "@/i18n/config"
import {
  ComponentSessionProps,
  TypeMapComponent,
  WidgetCardInfo,
} from "@/page/App/components/ComponentPanel/interface"
import { WidgetConfig } from "@/widgetLibrary/interface"
import {
  WidgetType,
  WidgetTypeList,
  widgetBuilder,
} from "@/widgetLibrary/widgetBuilder"

export const DEPRECATED_WIDGETS = ["CHART", "TABLE_WIDGET"]
export const PREMIUM_WIDGETS = ["DRIVE_PICKER_WIDGET"]

export type SessionType = keyof typeof sessionTypeMapSessionNameKey

export const sessionTypeMapSessionNameKey = {
  COMMON: i18n.t("editor.widget_picker.sessions.commonly"),
  INPUTS: i18n.t("editor.widget_picker.sessions.inputs"),
  SELECT: i18n.t("editor.widget_picker.sessions.selects"),
  ILLA_DRIVE: i18n.t("editor.widget_picker.sessions.drive"),
  CALENDAR: i18n.t("editor.widget_picker.sessions.calendar"),
  PRESENTATION: i18n.t("editor.widget_picker.sessions.presentation"),
  DATA: i18n.t("editor.widget_picker.sessions.data"),
  CONTAINER: i18n.t("editor.widget_picker.sessions.container"),
  NAVIGATION: i18n.t("editor.widget_picker.sessions.navigation"),
}

const COMMONLY_WIDGET = new Set([
  "DATA_GRID_WIDGET",
  "TEXT_WIDGET",
  "BUTTON_WIDGET",
  "INPUT_WIDGET",
  "NUMBER_INPUT_WIDGET",
  "DRIVE_PICKER_WIDGET",
  "CONTAINER_WIDGET",
  "FORM_WIDGET",
  "MODAL_WIDGET",
  "CHART_WIDGET",
  "IMAGE_WIDGET",
  "NAVIGATION_WIDGET",
])

const getListItemConfig = (type: WidgetType): WidgetConfig => {
  return widgetBuilder(type).config
}

const translateChildren = (componentConfigs: WidgetConfig[]) => {
  const sessionConfigs: TypeMapComponent = {
    COMMON: [],
    INPUTS: [],
    ILLA_DRIVE: [],
    SELECT: [],
    CALENDAR: [],
    DATA: [],
    CONTAINER: [],
    NAVIGATION: [],
    PRESENTATION: [],
  }
  componentConfigs.forEach((item) => {
    const { sessionType = "COMMON", type, displayName, widgetName } = item
    if (!sessionConfigs[sessionType]) {
      sessionConfigs[sessionType] = []
    }
    const childrenConfig: WidgetCardInfo = {
      id: `${sessionType}-${type}-${displayName}`,
      keywords: item.keywords as string[],
      widgetType: type,
      widgetName,
      icon: item.icon,
      displayName,
      isPremiumWidget: PREMIUM_WIDGETS.includes(type),
    }
    if (COMMONLY_WIDGET.has(type as string)) {
      sessionConfigs.COMMON.push(childrenConfig)
    }
    sessionConfigs[sessionType].push(childrenConfig)
  })
  return sessionConfigs
}

export const buildComponentConfigs = () => {
  return WidgetTypeList.filter(
    (type) => !DEPRECATED_WIDGETS.includes(type),
  ).map((item) => {
    return getListItemConfig(item) as WidgetConfig
  }) as WidgetConfig[]
}

const buildSessionTypeMapComponentConfig = (): TypeMapComponent => {
  const componentConfigs = buildComponentConfigs()
  return translateChildren(componentConfigs)
}

export const buildComponentList = (): ComponentSessionProps[] => {
  const configs = buildSessionTypeMapComponentConfig()
  const keys = Object.keys(configs) as SessionType[]
  return keys.map((key) => {
    return {
      sessionType: key,
      sessionTitle: sessionTypeMapSessionNameKey[key],
      widgetCardInfos: configs[key],
    }
  })
}

export const buildInitDragInfo = (type: WidgetType) => {
  const componentConfigs = buildComponentConfigs()
  const currentComponentConfig = componentConfigs.find(
    (config) => config.type === type,
  )
  return currentComponentConfig
}
