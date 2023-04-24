import { isEqual } from "lodash"
import { getTemplateConfig } from "@/config/template"
import { TemplateName } from "@/config/template/interface"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  Resource,
  ResourceContent,
  ResourceInitialConfig,
} from "@/redux/resource/resourceState"
import { createApp } from "@/services/apps"
import store from "@/store"
import { builderRequest } from "../http"

export const createResource = async (
  data: ResourceInitialConfig<ResourceContent>,
) => {
  const response = await builderRequest<Resource<ResourceContent>>(
    {
      method: "POST",
      url: "/resources",
      data,
    },
    {
      needTeamID: true,
    },
  )
  store.dispatch(resourceActions.addResourceItemReducer(response.data))
  return response.data.resourceId
}

export const createAction = async (
  appId: string,
  data: Partial<ActionItem<ActionContent>>,
) => {
  const response = await builderRequest<ActionItem<ActionContent>>(
    {
      url: `/apps/${appId}/actions`,
      method: "POST",
      data,
    },
    { needTeamID: true },
  )
  store.dispatch(actionActions.addActionItemReducer(response.data))
  return response.data.actionId
}

export const forkTemplateApp = async (
  templateType: TemplateName,
  appName: string,
) => {
  const {
    config: { appConfig, actions, resources },
  } = getTemplateConfig(templateType)
  const currentResources = getAllResources(store.getState())
  const resourceList = await Promise.all(
    resources.map((data) => {
      const resource = currentResources.find(
        (item) =>
          item.resourceName === data.resourceName &&
          item.resourceType === data.resourceType &&
          isEqual(item.content, data.content),
      )

      return resource ? resource.resourceId : createResource(data)
    }),
  )
  const appId = await createApp(appName, appConfig)
  if (resourceList.length) {
    await Promise.all(
      actions.map((data) => {
        const { resourceIndex, ...actionData } = data
        const resourceId = resourceList[resourceIndex] || ""
        return createAction(appId, {
          ...actionData,
          resourceId,
        })
      }),
    )
  }
  return appId
}
