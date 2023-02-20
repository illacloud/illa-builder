import { getCurrentId } from "@/redux/team/teamSelector"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

const teamID = "ILAfx4p1C7d0"

export const getTeamID = () => {
  return isCloudVersion ? getCurrentId(store.getState()) : teamID
}
