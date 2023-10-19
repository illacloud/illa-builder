import { builderRequest } from "@illa-public/illa-net"
import { Resource, ResourceContent } from "@illa-public/public-types"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getPlanUtils,
} from "@illa-public/user-data"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  canAccess,
} from "@illa-public/user-role-utils"
import { useSelector } from "react-redux"
import useSWR from "swr"

export const useResourceList = () => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const canAccessResourceList = canAccess(
    currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.RESOURCE,
    getPlanUtils(currentTeamInfo),
    ACTION_ACCESS.VIEW,
  )
  return useSWR(
    ["/resources", currentTeamInfo?.id, canAccessResourceList],
    ([url, teamID]) =>
      canAccessResourceList
        ? builderRequest<Resource<ResourceContent>[]>(
            {
              url: url,
              method: "GET",
            },
            { teamID },
          ).then((res) => res.data)
        : [],
  )
}

export const fetchDeleteResource = async (
  resourceID: string,
  teamID: string,
) => {
  return builderRequest<Resource<ResourceContent>>(
    {
      url: `/resources/${resourceID}`,
      method: "DELETE",
    },
    {
      teamID,
    },
  )
}
