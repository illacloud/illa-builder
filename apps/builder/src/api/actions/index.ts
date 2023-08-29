import { builderRequest } from "@illa-public/illa-net"
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
import { getCurrentTeamID } from "@/utils/team"

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
      teamID: getCurrentTeamID(),
    },
  )
  store.dispatch(resourceActions.addResourceItemReducer(response.data))
  return response.data.resourceID
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
    { teamID: getCurrentTeamID() },
  )
  store.dispatch(actionActions.addActionItemReducer(response.data))
  return response.data.actionID
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

      return resource ? resource.resourceID : createResource(data)
    }),
  )

  const appId = await createApp(appName, appConfig)
  if (resourceList.length) {
    await Promise.all(
      actions.map((data) => {
        const { resourceIndex, resourceID: _, ...actionData } = data
        const resourceID = resourceList[resourceIndex] || ""
        return createAction(appId, {
          ...actionData,
          resourceID,
        })
      }),
    )
  }
  return appId
}
