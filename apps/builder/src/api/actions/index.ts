import { BuilderApi } from "@/api/base"
import { CloudApi } from "@/api/cloudApi"
import { fetchInviteLinkResponse } from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
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
  ResourceType,
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
