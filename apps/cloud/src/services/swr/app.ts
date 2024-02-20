import { builderRequest } from "@illa-public/illa-net"
import {
  APP_TYPE,
  AppInfoShape,
  ComponentTreeNode,
} from "@illa-public/public-types"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { useSelector } from "react-redux"
import useSWR from "swr"

export const useAppList = (canAccessApps: boolean) => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  return useSWR(
    ["/apps", currentTeamInfo?.id, canAccessApps],
    ([url, teamID]) =>
      canAccessApps
        ? builderRequest<AppInfoShape[]>(
            {
              url,
              method: "GET",
            },
            { teamID },
          ).then((res) => res.data)
        : [],
  )
}

export const fetchDeleteApp = (appID: string, teamID: string) => {
  return builderRequest<{ appID: string }>(
    {
      url: `/apps/${appID}`,
      method: "DELETE",
    },
    { teamID },
  )
}

export const fetchCopyApp = (appID: string, name: string, teamID: string) => {
  return builderRequest<AppInfoShape>(
    {
      url: `/apps/${appID}/duplication`,
      method: "POST",
      data: {
        appName: name,
      },
    },
    {
      teamID,
    },
  ).then((res) => res.data)
}

export const fetchUpdateAppConfig = async (
  appID: string,
  teamID: string,
  config: {
    public?: boolean
    waterMark?: boolean
    description?: string
    appName?: string
  },
) => {
  return builderRequest<AppInfoShape>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: config,
    },
    {
      teamID,
    },
  ).then((res) => res.data)
}

interface IAppCreateRequestData {
  appName: string
  initScheme: ComponentTreeNode
  appType: APP_TYPE
}

export const fetchCreateApp = (data: IAppCreateRequestData, teamID: string) => {
  return builderRequest<AppInfoShape>(
    {
      url: "/apps",
      method: "POST",
      data,
    },
    { teamID },
  )
}
