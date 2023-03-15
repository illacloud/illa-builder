import { TemplateName, TemplateSetting } from "@/config/template/interface"
import {
  TABLE_APP_CONFIG,
  TABLE_TEMPLATE_ACTIONS,
  TABLE_TEMPLATE_RESOURCES,
} from "@/config/template/table"
import {
  VIDEO_APP_CONFIG,
  VIDEO_RESOURCES_CONFIG,
} from "@/config/template/video"

export const templateConfig = {
  Video: {
    appConfig: VIDEO_APP_CONFIG,
    resources: VIDEO_RESOURCES_CONFIG,
    actions: [],
    example: "https://builder.illacloud.com/chakra/deploy/app/ILAfx4p1C7eq",
  },
  Table: {
    appConfig: TABLE_APP_CONFIG,
    resources: TABLE_TEMPLATE_RESOURCES,
    actions: TABLE_TEMPLATE_ACTIONS,
    example: "https://builder.illacloud.com/chakra/deploy/app/ILAfx4p1C7eq",
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

export const getTemplateConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]
}
