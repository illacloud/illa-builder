import { getCurrentId } from "@/redux/team/teamSelector"
import { ILLARoute } from "@/router"
import store from "@/store"

export const getTeamID = () => {
  return getCurrentId(store.getState())
}

// maybe not same as current team
export const getCurrentPageTeamIdentifier = () => {
  return ILLARoute.state.matches[0].params.teamIdentifier
}
