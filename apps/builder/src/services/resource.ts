import { builderRequest, notNeedAuthRequest } from "@illa-public/illa-net"
import { AccessType } from "@/redux/resource/googleSheetResource"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { getCurrentTeamID } from "../utils/team"

export const requestCreateResource = async (data: unknown) => {
  return await builderRequest<Resource<ResourceContent>>(
    {
      url: "/resources",
      method: "POST",
      data,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const requestUpdateResource = async (
  resourceID: string,
  data: unknown,
) => {
  const url = `/resources/${resourceID}`
  return await builderRequest<Resource<ResourceContent>>(
    {
      url,
      method: "PUT",
      data,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

interface IWhiteListIPResponse {
  resources: string[]
}

export const requestWhiteListIP = async () => {
  return await notNeedAuthRequest<IWhiteListIPResponse>({
    url: "https://peripheral-api.illasoft.com/v1/meta",
    method: "GET",
  })
}

export const fetchResources = (signal: AbortSignal) => {
  return builderRequest<Resource<ResourceContent>[]>(
    {
      url: "/resources",
      method: "GET",
      signal: signal,
    },
    { teamID: getCurrentTeamID() },
  )
}

interface IResourceMeta {
  resourceName: string
  schema: Record<string, Record<string, { data_type: string }>>
}

export const fetchResourceMeta = async (resourceID: string) => {
  return builderRequest<IResourceMeta>(
    {
      url: `/resources/${resourceID}/meta`,
      method: "GET",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchDeleteResource = async (resourceID: string) => {
  return builderRequest<Resource<ResourceContent>>(
    {
      url: `/resources/${resourceID}`,
      method: "DELETE",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const getOAuthAccessToken = async (
  resourceID: string,
  redirectURL: string,
  accessType: AccessType,
) => {
  return builderRequest<{
    accessToken: string
  }>(
    {
      method: "POST",
      url: `/resources/${resourceID}/token`,
      data: {
        accessType,
        redirectURL,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const redirectToGoogleOAuth = async (
  resourceID: string,
  accessToken: string,
) => {
  return builderRequest<{ url: string }>(
    {
      method: "GET",
      url: `/resources/${resourceID}/oauth2?accessToken=${accessToken}`,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const getOAuthRefreshData = async (
  resourceID: string,
  signal: AbortSignal,
) => {
  return builderRequest<Resource<ResourceContent>>(
    {
      url: `/resources/${resourceID}/refresh`,
      method: "POST",
      signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}
