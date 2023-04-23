import { basicRequest, builderRequest } from "@/api/http"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"

export const requestCreateResource = async (data: unknown) => {
  return await builderRequest<Resource<ResourceContent>>(
    {
      url: "/resources",
      method: "POST",
      data,
    },
    {
      needTeamID: true,
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
      needTeamID: true,
    },
  )
}

interface IWhiteListIPResponse {
  resources: string[]
}
export const requestWhiteListIP = async () => {
  return await basicRequest<IWhiteListIPResponse>({
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
    { needTeamID: true },
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
      needTeamID: true,
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
      needTeamID: true,
    },
  )
}
