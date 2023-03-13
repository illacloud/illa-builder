import { TemplateName, TemplateSetting } from "@/config/template/interface"
import {
  VIDEO_APP_CONFIG,
  VIDEO_RESOURCES_CONFIG,
} from "@/config/template/video"

export const templateConfig = {
  Video: {
    appConfig: VIDEO_APP_CONFIG,
    resourcesConfig: VIDEO_RESOURCES_CONFIG,
  },
  Table: {
    appConfig: VIDEO_APP_CONFIG,
    resourcesConfig: VIDEO_RESOURCES_CONFIG,
  },
}

export const Templates: TemplateSetting[] = [
  {
    name: "Video",
    desc: "A template designed to show off visualization capabilities",
  },
  {
    name: "Table",
    desc: "A template designed to show off visualization capabilities",
  },
]

export const getTemplateAppConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]?.appConfig
}

export const getTemplateResources = (templateName: TemplateName) => {
  return templateConfig[templateName]?.resourcesConfig
}
