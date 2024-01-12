import {
  ActionContent,
  ActionItem,
  ComponentTreeNode,
  Resource,
  ResourceContent,
} from "@illa-public/public-types"
import { isEqual } from "lodash-es"
import { v4 } from "uuid"
import { createResource } from "@/api/actions"
import Actions from "@/config/guide/actions.json"
import Components from "@/config/guide/components.json"
import data from "@/config/guide/data.json"
import Resources from "@/config/guide/resources.json"
import { TemplateActions, TemplateResources } from "@/config/template/interface"
import { fixedActionToNewAction } from "@/hooks/utils/fixedAction"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import store from "@/store"

export const GUIDE_COMPONENTS = Components as unknown as ComponentTreeNode[]
export const GUIDE_RESOURCES = Resources as Resource<ResourceContent>[]
export const GUIDE_ACTIONS = Actions

// [TODO] remove actionID when test run. @xiaoyu @karminski
export const GUIDE_DEFAULT_ACTION_ID = "ILAfx4p1C7d0"

export const GUIDE_DATA = data as unknown as CurrentAppResp

const formatAppDataToConfig = (currentApp: CurrentAppResp) => {
  const resourceIDList = currentApp.actions.map((action) => action.resourceID)

  // get resources form resourceIDList, and generate filter
  const resources = GUIDE_RESOURCES.filter((resource) =>
    resourceIDList.includes(resource.resourceID),
  ).map(({ resourceName, resourceType, content }) => ({
    resourceName,
    resourceType,
    content,
  })) as TemplateResources

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
      const resourceIndex = resourceIDList.indexOf(resourceID)
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

  return {
    resources,
    actions,
  }
}

export const GUIDE_CONFIG = formatAppDataToConfig(GUIDE_DATA)

export const initGuideApp = async (): Promise<CurrentAppResp> => {
  const { actions, resources } = GUIDE_CONFIG
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
  // init actions
  let actionList
  if (resourceList.length) {
    actionList = await Promise.all(
      actions.map((data) => {
        const { resourceIndex, ...actionData } = data
        const resourceID = resourceList[resourceIndex] || ""
        return {
          ...actionData,
          resourceID,
          actionID: v4(),
        } as ActionItem<ActionContent>
      }),
    )
    if (actionList?.length) {
      const currentAction = fixedActionToNewAction(actionList)[0]
      store.dispatch(actionActions.addActionItemReducer(currentAction))
      store.dispatch(configActions.changeSelectedAction(currentAction))
    }
  }

  return {
    ...GUIDE_DATA,
    actions: actionList ?? [],
  }
}
