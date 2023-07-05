import { FORM_DATA } from "@/config/template/Form"
import { LIST_DATA } from "@/config/template/List"
import { TABLE_DATA } from "@/config/template/Table"
import FormIcon from "@/config/template/icon/form.svg"
import ListIcon from "@/config/template/icon/list.svg"
import TableIcon from "@/config/template/icon/table.svg"
import {
  TemplateActions,
  TemplateName,
  TemplateResources,
  TemplateSetting,
} from "@/config/template/interface"
import Resources from "@/config/template/resources.json"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"

export const formatAppDataToConfig = (currentApp: CurrentAppResp) => {
  const currentResources = Resources as Resource<ResourceContent>[]
  const resourceIdList = currentApp.actions.map((action) => action.resourceId)

  // get resources form resourceIdList, and generate filter
  const resources = currentResources
    .filter((resource) => resourceIdList.includes(resource.resourceId))
    .map(({ resourceName, resourceType, content }) => ({
      resourceName,
      resourceType,
      content,
    })) as TemplateResources

  // Add the resourceIndex attribute to actions
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

  const appConfig = currentApp.components

  return {
    appConfig,
    resources,
    actions,
  }
}

export const templateConfig = {
  Table: {
    nameKey: "editor.tutorial.panel.tutorial.templates_name.table",
    config: formatAppDataToConfig(TABLE_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C7QW",
  },
  Form: {
    nameKey: "editor.tutorial.panel.tutorial.templates_name.form",
    config: formatAppDataToConfig(FORM_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C7QV",
  },
  List: {
    nameKey: "editor.tutorial.panel.tutorial.templates_name.list",
    config: formatAppDataToConfig(LIST_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C7QU",
  },
}

export const Templates: TemplateSetting[] = [
  {
    type: "Table",
    nameKey: "editor.tutorial.panel.tutorial.templates_name.table",
    descKey: "editor.tutorial.panel.tutorial.templates_description.table",
    appId: "ILAex4p1C7QW",
    icon: TableIcon,
  },
  {
    type: "Form",
    nameKey: "editor.tutorial.panel.tutorial.templates_name.form",
    descKey: "editor.tutorial.panel.tutorial.templates_description.form",
    appId: "ILAex4p1C7QV",
    icon: FormIcon,
  },
  {
    type: "List",
    nameKey: "editor.tutorial.panel.tutorial.templates_name.list",
    descKey: "editor.tutorial.panel.tutorial.templates_description.list",
    appId: "ILAex4p1C7QU",
    icon: ListIcon,
  },
]

export const getTemplateConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]
}
