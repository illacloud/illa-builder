import { DASHBOARD_DATA } from "@/config/template/Dashboard"
import {
  TemplateActions,
  TemplateName,
  TemplateResources,
  TemplateSetting,
} from "@/config/template/interface"
import Resources from "@/config/template/resources.json"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"

const DemoProject = "illacloud_demo"

const handleTemplateData = (
  currentApp: CurrentAppResp,
  // currentResources: Resource<ResourceContent>[],
) => {
  const currentResources = Resources as Resource<ResourceContent>[]
  const resourceIdList = currentApp.actions.map((action) => action.resourceId)

  // get resources form resourceIdList, and generate filter
  const resources = currentResources
    .filter((resource) => resourceIdList.includes(resource.resourceId))
    .map(({ resourceName, resourceType, content, resourceId }) => ({
      resourceName,
      resourceType,
      content,
    })) as TemplateResources

  // 给 actions 加上 resourceIndex 属性
  const actions = currentApp.actions.map(
    ({
      resourceId,
      displayName,
      actionType,
      transformer,
      triggerMode,
      content,
      config,
    }) => {
      const resourceIndex = resourceIdList.indexOf(resourceId)
      return {
        resourceId,
        displayName,
        actionType,
        transformer,
        triggerMode,
        content,
        config,
        resourceIndex,
      }
    },
  ) as TemplateActions

  // 取出 components 里的 childrenNode 参数
  const appConfig = currentApp.components.childrenNode

  return {
    appConfig,
    resources,
    actions,
  }
}

export const templateConfig = {
  Table: {
    config: handleTemplateData(DASHBOARD_DATA),
    example: "https://builder.illacloud.com/chakra/deploy/app/ILAfx4p1C7eq",
  },
  Dashboard: {
    config: handleTemplateData(DASHBOARD_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C74H",
  },
}

export const Templates: TemplateSetting[] = [
  {
    name: "Table",
    desc: "A template designed to show off visualization capabilities",
    appId: "ILAex4p1C74H",
  },
  {
    name: "Dashboard",
    desc: "A template designed to show off visualization capabilities",
    appId: "ILAex4p1C74H",
  },
]

const getTemplateList = () => {
  Templates.map((template) => {})
}

export const getTemplateConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]
}
