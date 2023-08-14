import userDataStore, { getCurrentId } from "@illa-public/user-data"
import { ILLARoute } from "@/router"

export const getTeamID = () => {
  return getCurrentId(userDataStore.getState())
}

// maybe not same as current team
export const getCurrentPageTeamIdentifier = () => {
  return ILLARoute.state.matches[0].params.teamIdentifier
}
