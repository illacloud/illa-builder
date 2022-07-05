import store from "@/store"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"

export class ActionDisplayNameGenerator {
  static DISPLAY_NAME_TYPE: "actionDisplayNameType"

  static getDisplayName(type: string): string {
    let index = 1
    let name = `${type}${index}`

    // get unique name from all actions
    while (
      selectAllActionItem(store.getState())
        .map((i) => i.displayName)
        .includes(name)
    ) {
      index += 1
      name = `${type}${index}`
    }

    // check cache map
    while (isAlreadyGenerate({ type, displayName: name })) {
      index += 1
      name = `${type}${name}`
    }

    store.dispatch(
      displayNameActions.addDisplayNameReducer({
        type: this.DISPLAY_NAME_TYPE,
        displayName: name,
      }),
    )

    return name
  }

  static cacheDisplayName(displayName: string) {
    store.dispatch(
      displayNameActions.addDisplayNameReducer({
        type: this.DISPLAY_NAME_TYPE,
        displayName,
      }),
    )
  }

  static removeDisplayName(displayName: string) {
    store.dispatch(
      displayNameActions.removeDisplayNameReducer({
        type: this.DISPLAY_NAME_TYPE,
        displayName,
      }),
    )
  }
}
