import { APP_TYPE } from "@illa-public/public-types"
import { FC, LazyExoticComponent } from "react"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { getMobileWidgetConfig } from "./Mobile/register"
import { getPCWidgetConfig } from "./PC/register"
import { EventHandlerConfig, WidgetConfig } from "./interface"

let WidgetConfigMap: Record<
  string,
  {
    config: WidgetConfig
    panelConfig: PanelConfig[]
    eventHandlerConfig?: EventHandlerConfig
    widget: LazyExoticComponent<FC<any>>
  }
> = {}

export type WidgetType = keyof typeof WidgetConfigMap

export const registerWidget = (appType: APP_TYPE = APP_TYPE.PC) => {
  switch (appType) {
    case APP_TYPE.PC: {
      WidgetConfigMap = getPCWidgetConfig()
      break
    }
    case APP_TYPE.MOBILE: {
      WidgetConfigMap = getMobileWidgetConfig()
      break
    }
  }
}

export const getWidgetTypeList = () => {
  return Object.keys(WidgetConfigMap)
}

export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfigMap[type]
}
