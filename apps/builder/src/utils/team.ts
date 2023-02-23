import { getCurrentId } from "@/redux/team/teamSelector"
import { ILLARoute } from "@/router"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

const teamID = "ILAfx4p1C7d0"

export const getTeamID = () => {
  return isCloudVersion ? getCurrentId(store.getState()) : teamID
}

// maybe not same as current team
export const getCurrentPageTeamIdentifier = () => {
  return isCloudVersion ? ILLARoute.state.matches[0].params.teamIdentifier : "0"
}
