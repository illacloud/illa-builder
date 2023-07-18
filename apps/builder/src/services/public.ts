import { builderRequest } from "@/api/http"
import { BuilderCardInfo } from "@/page/Member/interface"

export const fetchBuilderDesc = () => {
  return builderRequest<BuilderCardInfo>(
    {
      method: "get",
      url: `/builder/desc`,
    },
    {
      needTeamID: true,
    },
  )
}

interface IFetchWsURLResponse {
  wsURL: string
}

export const fetchDashboardWsURL = async (abortSingle?: AbortSignal) => {
  return await builderRequest<IFetchWsURLResponse>(
    {
      url: `/room/websocketConnection/dashboard`,
      method: "GET",
      signal: abortSingle,
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchAppTextWsUrl = async (
  roomID: string,
  abortSingle?: AbortSignal,
) => {
  return await builderRequest<IFetchWsURLResponse>(
    {
      url: `/room/websocketConnection/app/${roomID}`,
      method: "GET",
      signal: abortSingle,
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchAppBinaryWsUrl = async (
  roomID: string,
  abortSingle?: AbortSignal,
) => {
  return await builderRequest<IFetchWsURLResponse>(
    {
      url: `/room/binaryWebsocketConnection/app/${roomID}`,
      method: "GET",
      signal: abortSingle,
    },
    {
      needTeamID: true,
    },
  )
}
