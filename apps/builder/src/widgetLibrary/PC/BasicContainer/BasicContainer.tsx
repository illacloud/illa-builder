import { CONTAINER_TYPE } from "@illa-public/public-types"

export const BasicContainerConfig = {
  type: "CANVAS",
  displayName: "canvas",
  widgetName: "canvas",
  containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
  w: 0,
  h: 0,
  version: 0,
}

export const generateBasicContainerConfig = (displayName: string) => {
  return {
    ...BasicContainerConfig,
    displayName,
    widgetName: displayName,
  }
}
