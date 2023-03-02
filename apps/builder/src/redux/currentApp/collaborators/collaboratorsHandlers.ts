import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"

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
  Connection.getRoom("app", currentAppID)?.send(
    getPayload(
      Signal.SIGNAL_COOPERATE_ATTACH,
      Target.TARGET_COMPONENTS,
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
  Connection.getRoom("app", currentAppID)?.send(
    getPayload(
      Signal.SIGNAL_COOPERATE_DISATTACH,
      Target.TARGET_COMPONENTS,
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

export const AVATAR_WIDTH = 14
export const AVATAR_GAP = 4
export const MOVE_BAR_SVG_WIDTH = 12
export const AVATAR_LIST_MARGIN = 8

// two avatar + one gap + one svg
export const MIN_MOVE_BAR_WIDTH = 48

export const MIN_DISABLE_MARGIN_WIDTH = 34

export const MIN_THREE_AVATAR_WIDTH = 50

export const MIN_THREE_AVATAR_MOVE_BAR_WIDTH = 70
