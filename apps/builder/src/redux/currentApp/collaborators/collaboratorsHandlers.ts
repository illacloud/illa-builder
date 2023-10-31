import { getCurrentTeamInfo } from "@illa-public/user-data"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { configActions } from "@/redux/config/configSlice"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import store, { AppListenerEffectAPI } from "@/store"

export const getDisattachedComponents = (
  currentAttached: Record<string, CollaboratorsInfo[]>,
  currentSelected: string[],
) => {
  const preciousAttached = Object.keys(currentAttached) || []
  return preciousAttached.filter(
    (displayName) => !currentSelected.includes(displayName),
  )
}

export const updateSelectedComponentUsersHandler = (payload: string[]) => {
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  const { id: teamID = "", uid = "" } =
    getCurrentTeamInfo(store.getState()) ?? {}
  Connection.getTextRoom("app", currentAppID)?.send(
    getTextMessagePayload(
      TextSignal.COOPERATE_ATTACH,
      TextTarget.COMPONENTS,
      true,
      {
        type: "attachComponent",
        payload: [],
      },
      teamID,
      uid,
      payload,
    ),
  )
}

export const clearComponentAttachedUsersHandler = (payload: string[]) => {
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  const { id: teamID = "", uid = "" } =
    getCurrentTeamInfo(store.getState()) ?? {}
  Connection.getTextRoom("app", currentAppID)?.send(
    getTextMessagePayload(
      TextSignal.COOPERATE_DISATTACH,
      TextTarget.COMPONENTS,
      true,
      {
        type: "attachComponent",
        payload: [],
      },
      teamID,
      uid,
      payload,
    ),
  )
}

export const updateCurrentAllComponentsAttachedUsers = (
  displayName: string[],
  currentComponentsAttachedUsers: Record<string, CollaboratorsInfo[]>,
) => {
  updateSelectedComponentUsersHandler(displayName)
  const disattachedComponents = getDisattachedComponents(
    currentComponentsAttachedUsers,
    displayName,
  )
  if (!!disattachedComponents.length) {
    clearComponentAttachedUsersHandler(disattachedComponents)
  }
}

export const handleClearSelectedComponentExecution = (
  action: ReturnType<typeof componentsActions.deleteComponentNodeReducer>,
  listenerApi: AppListenerEffectAPI,
) => {
  let currentSelected = listenerApi.getState().config.selectedComponents
  if (Array.isArray(currentSelected) && currentSelected.length > 0) {
    currentSelected = currentSelected.filter(
      (item) => !action.payload.displayNames.includes(item),
    )
  }
  listenerApi.dispatch(configActions.updateSelectedComponent(currentSelected))
  clearComponentAttachedUsersHandler(action.payload.displayNames)
}

export const AVATAR_WIDTH = 14
export const AVATAR_GAP = 4

export const MIN_DISABLE_MARGIN_WIDTH = 34

export const MIN_THREE_AVATAR_WIDTH = 50

export const MIN_THREE_AVATAR_MOVE_BAR_WIDTH = 70
