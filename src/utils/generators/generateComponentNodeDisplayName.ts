// string for component
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"

export class ComponentNodeDisplayNameGenerator {
  static map: {
    [key: string]: number
  } = {}

  static initialComponentMap(componentNode: ComponentNode) {
    if (
      componentNode.type != null &&
      new RegExp(`${componentNode.type}\\d+`).test(componentNode.displayName)
    ) {
      if (this.map.hasOwnProperty(componentNode.type)) {
        this.map[componentNode.type] = this.map[componentNode.type] + 1
      } else {
        this.map[componentNode.type] = 1
      }
    }
    const children = componentNode.childrenNode
    if (children != null) {
      Object.keys(children).forEach((key) => {
        this.initialComponentMap(children[key])
      })
    }
  }

  // use when create success
  static getDisplayName(type: string, showName?: string): string {
    let index = 1
    if (type in this.map) {
      const num = this.map[type]
      index = num + 1
    }
    let name = `${showName || type}${index}`

    while (
      searchDsl(store.getState().currentApp.editor.components.rootDsl, name) !=
      null
    ) {
      index = index + 1
      name = `${showName || type}${index}`
    }
    this.map[type] = index
    return name
  }
}
