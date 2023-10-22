import { builderRequest } from "@illa-public/illa-net"
import { getCurrentTeamID } from "../utils/team"

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
      teamID: getCurrentTeamID(),
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
      teamID: getCurrentTeamID(),
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
      teamID: getCurrentTeamID(),
    },
  )
}
