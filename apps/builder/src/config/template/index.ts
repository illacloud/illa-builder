import {
  DASHBOARD_APP_CONFIG,
  DASHBOARD_TEMPLATE_ACTIONS,
  DASHBOARD_TEMPLATE_RESOURCES,
} from "@/config/template/dashboard"
import { TemplateName, TemplateSetting } from "@/config/template/interface"
import {
  TABLE_APP_CONFIG,
  TABLE_TEMPLATE_ACTIONS,
  TABLE_TEMPLATE_RESOURCES,
} from "@/config/template/table"

export const templateConfig = {
  Table: {
    appConfig: TABLE_APP_CONFIG,
    resources: TABLE_TEMPLATE_RESOURCES,
    actions: TABLE_TEMPLATE_ACTIONS,
    example: "https://builder.illacloud.com/chakra/deploy/app/ILAfx4p1C7eq",
  },
  Dashboard: {
    appConfig: DASHBOARD_APP_CONFIG,
    resources: DASHBOARD_TEMPLATE_RESOURCES,
    actions: DASHBOARD_TEMPLATE_ACTIONS,
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C74H",
  },
}

export const Templates: TemplateSetting[] = [
  {
    name: "Table",
    desc: "A template designed to show off visualization capabilities",
  },
  {
    name: "Dashboard",
    desc: "A template designed to show off visualization capabilities",
  },
]

export const getTemplateConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]
}
