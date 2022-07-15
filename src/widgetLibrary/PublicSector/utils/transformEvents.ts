export const transformEvents = (event: any) => {
  if (!event) return
  const { actionType } = event
  if (actionType === "openUrl") {
    const { newTab, url, enabled } = event
    return {
      script: `{{goToURL("${url}",${newTab})}}`,
      enabled,
    }
  }
  if (actionType === "showNotification") {
    const { title, description, notificationType, duration, enabled } = event
    return {
      script: `{{showNotification("${notificationType}","${title}","${description}","${duration}")}}`,
      enabled,
    }
  }
  if (actionType === "widget") {
    const { widgetID, widgetMethod, enabled } = event
    if (
      ["setValue", "setImageUrl", "setStartValue", "setEndValue"].includes(
        widgetMethod,
      )
    ) {
      const { widgetTargetValue } = event
      return {
        script: `{{${widgetID}.${widgetMethod}("${widgetTargetValue}")}}`,
        enabled,
      }
    }
    if (
      widgetMethod === "clearValue" ||
      widgetMethod === "toggle" ||
      widgetMethod === "focus"
    ) {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }
  }
  return {
    script: `{{}}`,
    enabled: "{{false}}",
  }
}
