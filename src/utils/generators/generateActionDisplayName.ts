import { ActionItem } from "@/redux/currentApp/action/actionState"

export class ActionDisplayNameGenerator {
  static map: {
    [key: string]: number
  } = {}

  static init(actionList: ActionItem[]) {
    actionList.forEach(({ displayName, actionType }) => {
      if (/${actionType}\d+$/.test(displayName)) {
        if (this.map.hasOwnProperty(actionType)) {
          this.map[actionType] += 1
        } else {
          this.map[actionType] = 1
        }
      }
    })
  }

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
