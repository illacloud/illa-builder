import {
  ILLAPublicStorage,
  getAuthToken,
  getILLACloudURL,
} from "@illa-public/utils"
import { fetchLogout } from "@/services/auth"
import { ILLACloudStorage } from "@/utils/storage"

const CURRENT_TEAM_ID_KEY = "currentTeamID"

export const setLocalCurrentTeamID = (teamID: string) => {
  ILLACloudStorage.setLocalStorage(CURRENT_TEAM_ID_KEY, teamID)
}

export const getLocalCurrentTeamID = () => {
  return ILLACloudStorage.getLocalStorage(CURRENT_TEAM_ID_KEY)
}

export const removeLocalTeam = () => {
  return ILLACloudStorage.removeLocalStorage("teamIdentifier")
}

export const onClickLogout = async () => {
  const ILLAToken = getAuthToken()
  ILLAPublicStorage.clearLocalStorage()
  if (!ILLAToken) {
    window.location.href = `${getILLACloudURL()}/login`
    return
  }
  try {
    await fetchLogout(ILLAToken)
  } catch (e) {
  } finally {
    window.location.href = `${getILLACloudURL()}/login`
  }
}
