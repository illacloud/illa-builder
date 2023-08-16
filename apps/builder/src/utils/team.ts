import { getCurrentId } from "@illa-public/user-data"
import { ILLARoute } from "@/router"
import store from "../store"

export const getCurrentTeamID = () => {
  return getCurrentId(store.getState())
}

// maybe not same as current team
export const getCurrentTeamIdentifier = () => {
  return ILLARoute.state.matches[0].params.teamIdentifier
}
