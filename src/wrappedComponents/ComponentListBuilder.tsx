import { widgetBuilder, WidgetType, WidgetTypeList } from "./WidgetBuilder"
import {
  ComponentSessionProps,
  NewTypeMapComponent,
} from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
import { WidgetCardInfo, WidgetConfig } from "./interface"
import i18n from "@/i18n/config"

export type NewSessionType = keyof typeof newSessionTypeMapSessionNameKey

const newSessionTypeMapSessionNameKey = {
  COMMON: i18n.t("editor.widget_picker.sessions.commonly"),
  INPUTS: i18n.t("editor.widget_picker.sessions.inputs"),
  SELECT: i18n.t("editor.widget_picker.sessions.selects"),
  CALENDAR: i18n.t("editor.widget_picker.sessions.calendar"),
  PRESENTATION: i18n.t("editor.widget_picker.sessions.presentation"),
  DATE: i18n.t("editor.widget_picker.sessions.data"),
  CONTAINER: i18n.t("editor.widget_picker.sessions.container"),
  NAVIGATION: i18n.t("editor.widget_picker.sessions.navigation"),
}

const COMMONLY_WIDGET = new Set([
  "TABLE_WIDGET",
  "TEXT_WIDGET",
  "BUTTON_WIDGET",
  "INPUT_WIDGET",
  "NUMBER_INPUT_WIDGET",
  "SELECT_WIDGET",
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
  const sessionConfigs: NewTypeMapComponent = {
    COMMON: [],
    INPUTS: [],
    SELECT: [],
    CALENDAR: [],
    PRESENTATION: [],
    DATE: [],
    CONTAINER: [],
    NAVIGATION: [],
  }
  componentConfigs.forEach((item) => {
    const { sessionType = "COMMON", type, displayName } = item
    if (!sessionConfigs[sessionType]) {
      sessionConfigs[sessionType] = []
    }
    const childrenConfig: WidgetCardInfo = {
      ...item,
      id: `${sessionType}-${type}-${displayName}`,
    }
    if (COMMONLY_WIDGET.has(type as string)) {
      sessionConfigs.COMMON.push(childrenConfig)
    }
    sessionConfigs[sessionType].push(childrenConfig)
  })
  return sessionConfigs
}

const buildSessionTypeMapComponentConfig = (): NewTypeMapComponent => {
  const componentConfigs = WidgetTypeList.map((item) => {
    return getListItemConfig(item) as WidgetConfig
  }) as WidgetConfig[]
  return translateChildren(componentConfigs)
}

export const buildComponentList = (): ComponentSessionProps[] => {
  const configs = buildSessionTypeMapComponentConfig()
  const keys = Object.keys(configs) as NewSessionType[]
  return keys.map((key) => {
    return {
      title: newSessionTypeMapSessionNameKey[key],
      children: configs[key],
    }
  })
}
