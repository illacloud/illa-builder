// string for component
import store from "@/store"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"

export class DisplayNameGenerator {
  // use when create success
  static getDisplayName(type: string, showName?: string): string {
    let index = 1
    let name = `${showName || type}${index}`
    // check cache map
    while (isAlreadyGenerate(name)) {
      index = index + 1
      name = `${showName || type}${index}`
    }
    store.dispatch(displayNameActions.addDisplayNameReducer(name))
    return name
  }

  static removeDisplayName(displayName: string) {
    store.dispatch(displayNameActions.removeDisplayNameReducer(displayName))
  }
}
