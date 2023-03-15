import { isEqual } from "lodash"
import { createApp } from "@/api/apps"
import { BuilderApi } from "@/api/base"
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
import store from "@/store"

export const createResource = async (
  data: ResourceInitialConfig<ResourceContent>,
) => {
  const response = await BuilderApi.asyncTeamRequest<Resource<ResourceContent>>(
    {
      method: "POST",
      url: "/resources",
      data,
    },
  )
  store.dispatch(resourceActions.updateResourceItemReducer(response.data))
  return response.data.resourceId
}

export const createAction = async (
  appId: string,
  data: Partial<ActionItem<ActionContent>>,
) => {
  const response = await BuilderApi.asyncTeamRequest<ActionItem<ActionContent>>(
    {
      url: `/apps/${appId}/actions`,
      method: "POST",
      data,
    },
  )
  store.dispatch(actionActions.addActionItemReducer(response.data))
  return response.data.actionId
}

export const forkTemplateApp = async (templateName: TemplateName) => {
  const {
    name,
    config: { appConfig, actions, resources },
  } = getTemplateConfig(templateName)
  const resourceList = await Promise.all(
    resources.map((data) => {
      const currentResources = getAllResources(store.getState())
      const resource = currentResources.find(
        (item) =>
          item.resourceName === data.resourceName &&
          item.resourceType === data.resourceType &&
          isEqual(item.content, data.content),
      )

      return resource ? resource.resourceId : createResource(data)
    }),
  )
  const appId = await createApp(name, appConfig)
  if (resourceList.length) {
    const actionList = await Promise.all(
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
