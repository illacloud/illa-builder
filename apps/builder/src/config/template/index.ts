import {
  VIDEO_APP_CONFIG,
  VIDEO_RESOURCES_CONFIG,
} from "@/config/template/video"

export const TemplateConfig = {
  Video: {
    appConfig: VIDEO_APP_CONFIG,
    resourcesConfig: VIDEO_RESOURCES_CONFIG,
  },
  Table: {
    appConfig: VIDEO_APP_CONFIG,
    resourcesConfig: VIDEO_RESOURCES_CONFIG,
  },
}

type TemplateName = keyof typeof TemplateConfig

export interface Template {
  name: TemplateName
  desc: string
}

export const Templates: Template[] = [
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
  return TemplateConfig[templateName]?.appConfig
}

export const getTemplateResources = (templateName: TemplateName) => {
  return TemplateConfig[templateName]?.resourcesConfig
}
