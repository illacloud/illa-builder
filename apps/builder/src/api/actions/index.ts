import { builderRequest } from "@illa-public/illa-net"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  Resource,
  ResourceContent,
  ResourceInitialConfig,
} from "@/redux/resource/resourceState"
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
