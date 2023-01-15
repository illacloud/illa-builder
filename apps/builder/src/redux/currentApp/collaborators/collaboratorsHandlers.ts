import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
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
  Connection.getRoom("app", currentAppID)?.send(
    getPayload(
      Signal.SIGNAL_COOPERATE_ATTACH,
      Target.TARGET_COMPONENTS,
      true,
      {
        type: "attachComponent",
        payload: [],
      },
      payload,
    ),
  )
}

export const clearComponentAttachedUsersHandler = (payload: string[]) => {
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  Connection.getRoom("app", currentAppID)?.send(
    getPayload(
      Signal.SIGNAL_COOPERATE_DISATTACH,
      Target.TARGET_COMPONENTS,
      true,
      {
        type: "attachComponent",
        payload: [],
      },
      payload,
    ),
  )
}
