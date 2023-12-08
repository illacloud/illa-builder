export const getReportElementByWidget = (
  widgetType: string,
  isProductionMode?: boolean,
) => {
  let prefix = isProductionMode ? "deploy_" : "builder_editor_"
  switch (widgetType) {
    case "IMAGE_WIDGET":
      return `${prefix}traffic_not_enough_image`
    case "CAROUSEL_WIDGET":
      return `${prefix}traffic_not_enough_carousel`
    case "VIDEO_WIDGET":
      return `${prefix}traffic_not_enough_video`
    case "AUDIO_WIDGET":
      return `${prefix}traffic_not_enough_audio`
  }
}
