import {
  BaseEventItem,
  DataSourceEventItem,
  OpenUrlEventItem,
  ScriptEventItem,
  ShowNotificationEventItem,
  StateEventItem,
  WidgetEventItem,
} from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { EventsInProps } from "@/widgetLibrary/interface"

export const transformEvent = (event: BaseEventItem): EventsInProps => {
  const { type, event: eventType } = event
  if (type === "showNotification") {
    const { description, title, notificationType, duration, enabled, method } =
      event as ShowNotificationEventItem
    return {
      script: `{{showNotification("${notificationType}","${title}","${description}",${duration})}}`,
      eventType,
      enabled,
    }
  }
  if (type === "widget") {
    const { enabled, method, targetId } = event as WidgetEventItem
    return {
      script: `{{${targetId}.${method}()}}`,
      eventType,
      enabled,
    }
  }
  if (type === "datasource") {
    const { targetId, enabled, method } = event as DataSourceEventItem
    return {
      script: `{{${targetId}.${method}()}}`,
      eventType,
      enabled,
    }
  }
  if (type === "script") {
    const { script, enabled, method } = event as ScriptEventItem
    return {
      script,
      eventType,
      enabled,
    }
  }
  if (type === "state") {
    const { targetId, enabled, method, stateValue } = event as StateEventItem
    return {
      script: `{{${targetId}.${method}(${stateValue})}}`,
      eventType,
      enabled,
    }
  }
  if (type === "openUrl") {
    const { url, newTab, enabled, method } = event as OpenUrlEventItem
    return {
      script: `{{goToURL("${url}",${newTab})}}`,
      eventType,
      enabled,
    }
  }
  return {
    script: "",
    eventType: "",
    enabled: "false",
  }
}
