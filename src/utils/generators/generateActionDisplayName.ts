import store from "@/store"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"

export class ActionDisplayNameGenerator {
  static getDisplayName(type: string, showName?: string): string {
    let index = 1
    let name = `${showName || type}${index}`

    // get unique name from all actions
    while (
      selectAllActionItem(store.getState())
        .map((i) => i.displayName)
        .includes(name)
    ) {
      index += 1
      name = `${showName || type}${index}`
    }

    // check cache map
    while (isAlreadyGenerate({ type, displayName: name })) {
      index += 1
      name = `${showName || type}${name}`
    }

    store.dispatch(
      displayNameActions.addDisplayNameReducer({
        type: showName || type,
        displayName: name,
      }),
    )

    return name
  }

  static removeDisplayName(type: string, displayName: string) {
    store.dispatch(
      displayNameActions.removeDisplayNameReducer({
        type,
        displayName,
      }),
    )
  }
}
