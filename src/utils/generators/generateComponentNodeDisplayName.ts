// string for component
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"

export class ComponentNodeDisplayNameGenerator {
  // use when create success
  static getDisplayName(type: string, showName?: string): string {
    let index = 1
    let name = `${showName || type}${index}`
    // get name from redux tree
    while (
      searchDsl(store.getState().currentApp.editor.components.rootDsl, name) !=
      null
    ) {
      index = index + 1
      name = `${showName || type}${index}`
    }
    // check cache map
    while (isAlreadyGenerate({ type, displayName: name })) {
      index = index + 1
      name = `${showName || type}${index}`
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
