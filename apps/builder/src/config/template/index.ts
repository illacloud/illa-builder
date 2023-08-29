import { CUSTOM_LOGIN_DATA } from "@/config/template/CustomLogin"
import { CUSTOM_LOGIN_WITH_SC_DATA } from "@/config/template/CustomLoginWithSC"
import { FORM_DATA } from "@/config/template/Form"
import { LIST_DATA } from "@/config/template/List"
import { TABLE_GUIDE_DATA } from "@/config/template/TableGuide"
import FormIcon from "@/config/template/icon/form.svg"
import ListIcon from "@/config/template/icon/list.svg"
import LoginIcon from "@/config/template/icon/login.svg"
import LoginWithSCIcon from "@/config/template/icon/login_with_script.svg"
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
  const resourceIDList = currentApp.actions.map((action) => action.resourceID)

  // get resources form resourceIDList, and generate filter
  const filterResources = currentResources.filter((resource) =>
    resourceIDList.includes(resource.resourceID),
  )
  const filterResourcesIdList = filterResources.map(
    (resource) => resource.resourceID,
  )

  const resources = filterResources.map(
    ({ resourceName, resourceType, content }) => ({
      resourceName,
      resourceType,
      content,
    }),
  ) as TemplateResources

  // Add the resourceIndex attribute to actions
  const actions = currentApp.actions.map(
    ({
      resourceID,
      displayName,
      actionType,
      transformer,
      triggerMode,
      content,
      config,
    }) => {
      const resourceIndex = resourceID
        ? filterResourcesIdList.indexOf(resourceID)
        : -1
      return {
        resourceID,
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
  TableGuide: {
    nameKey: "editor.tutorial.panel.tutorial.templates_name.table_guide",
    config: formatAppDataToConfig(TABLE_GUIDE_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C7Ga",
  },
  CustomLogin: {
    nameKey: "editor.tutorial.panel.tutorial.templates_name.custom_login",
    config: formatAppDataToConfig(CUSTOM_LOGIN_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C7FD",
  },
  CustomLoginWithSC: {
    nameKey:
      "editor.tutorial.panel.tutorial.templates_name.custom_login_with_sc",
    config: formatAppDataToConfig(CUSTOM_LOGIN_WITH_SC_DATA),
    example:
      "https://builder.illacloud.com/illacloud_demo/deploy/app/ILAex4p1C7Eh",
  },
}

export const Templates: TemplateSetting[] = [
  {
    type: "TableGuide",
    nameKey: "editor.tutorial.panel.tutorial.templates_name.table_guide",
    descKey: "editor.tutorial.panel.tutorial.templates_description.table_guide",
    appId: "ILAex4p1C7Ga",
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
  {
    type: "CustomLogin",
    nameKey: "editor.tutorial.panel.tutorial.templates_name.custom_login",
    descKey:
      "editor.tutorial.panel.tutorial.templates_description.custom_login",
    appId: "ILAex4p1C7FD",
    icon: LoginIcon,
  },
  {
    type: "CustomLoginWithSC",
    nameKey:
      "editor.tutorial.panel.tutorial.templates_name.custom_login_with_sc",
    descKey:
      "editor.tutorial.panel.tutorial.templates_description.custom_login_with_sc",
    appId: "ILAex4p1C7Eh",
    icon: LoginWithSCIcon,
  },
]

export const getTemplateConfig = (templateName: TemplateName) => {
  return templateConfig[templateName]
}
