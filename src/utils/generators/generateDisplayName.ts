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

  static updateDisplayName(
    displayName: string,
    oldDisplayName?: string,
  ): boolean | void {
    if (isAlreadyGenerate(displayName)) {
      return false
    }

    if (oldDisplayName !== undefined) {
      this.removeDisplayName(oldDisplayName)
    }

    store.dispatch(displayNameActions.addDisplayNameReducer(displayName))
  }

  static removeDisplayName(displayName: string) {
    store.dispatch(displayNameActions.removeDisplayNameReducer(displayName))
  }

  static removeDisplayNameMulti(displayNames: string[]) {
    store.dispatch(
      displayNameActions.removeDisplayNameMultiReducer(displayNames),
    )
  }
}
