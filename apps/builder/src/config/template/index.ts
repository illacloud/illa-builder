import { FORM_DATA } from "@/config/template/Form"
import { LIST_DATA } from "@/config/template/List"
import { TABLE_DATA } from "@/config/template/Table"
import {
  TemplateActions,
  TemplateName,
  TemplateResources,
  TemplateSetting,
} from "@/config/template/interface"
import Resources from "@/config/template/resources.json"
import i18n from "@/i18n/config"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"

const handleTemplateData = (currentApp: CurrentAppResp) => {
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

  const appConfig = currentApp.components.childrenNode

  return {
    appConfig,
    resources,
    actions,
  }
}

export const templateConfig = {
  Table: {
    name: i18n.t("editor.tutorial.panel.tutorial.templates_name.table"),
    config: handleTemplateData(TABLE_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C74H",
  },
  Form: {
    name: i18n.t("editor.tutorial.panel.tutorial.templates_name.form"),
    config: handleTemplateData(FORM_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C74O",
  },
  List: {
    name: i18n.t("editor.tutorial.panel.tutorial.templates_name.list"),
    config: handleTemplateData(LIST_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C74N",
  },
}

export const Templates: TemplateSetting[] = [
  {
    type: "Table",
    name: i18n.t("editor.tutorial.panel.tutorial.templates_name.table"),
    desc: i18n.t("editor.tutorial.panel.tutorial.templates_description.table"),
    appId: "ILAex4p1C74H",
  },
  {
    type: "Form",
    name: i18n.t("editor.tutorial.panel.tutorial.templates_name.form"),
    desc: i18n.t("editor.tutorial.panel.tutorial.templates_description.form"),
    appId: "ILAex4p1C74O",
  },
  {
    type: "List",
    name: i18n.t("editor.tutorial.panel.tutorial.templates_name.list"),
    desc: i18n.t("editor.tutorial.panel.tutorial.templates_description.list"),
    appId: "ILAex4p1C74N",
  },
]

export const getTemplateConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]
}
