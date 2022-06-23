// string for component
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export class DisplayNameGenerator {
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
  static getDisplayName(type: string): string {
    if (type in this.map) {
      const num = this.map[type]
      this.map[type] = num + 1
    } else {
      this.map[type] = 1
    }
    return `${type}${this.map[type]}`
  }
}
