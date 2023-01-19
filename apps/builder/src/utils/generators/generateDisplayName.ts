// string for component
import { Connection, getPayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/interface"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"

export const ADD_DISPLAY_NAME = "addDisplayName"
export const REMOVE_DISPLAY_NAME = "removeDisplayName"
export const UPDATE_DISPLAY_NAME = "updateDisplayName"

export const PLACEHOLDER_DISPLAYNAME = []

export class DisplayNameGenerator {
  static displayNameList = new Set<string>(PLACEHOLDER_DISPLAYNAME)

  static appId: string = ""

  static isAlreadyGenerate(displayName: string): boolean {
    return this.displayNameList.has(displayName)
  }

  static initApp(appId: string) {
    this.appId = appId
  }

  // use when create success
  static generateDisplayName(type: string, showName?: string): string {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    let index = 1
    let name = `${showName || type}${index}`
    // check cache map
    while (this.isAlreadyGenerate(name)) {
      index = index + 1
      name = `${showName || type}${index}`
    }
    this.displayNameList.add(name)
    Connection.getRoom("app", this.appId)?.send(
      getPayload(
        Signal.SIGNAL_ONLY_BROADCAST,
        Target.TARGET_DISPLAY_NAME,
        true,
        { type: ADD_DISPLAY_NAME, payload: [name] },
        teamID,
        uid,
        [],
      ),
    )
    return name
  }

  static updateDisplayNameList(
    componentNode: ComponentNode,
    actionList: ActionItem<ActionContent>[],
  ) {
    this.displayNameList.clear()
    actionList.forEach((action) => {
      this.displayNameList.add(action.displayName)
    })
    this.addComponentDisplayName(componentNode)
  }

  static addComponentDisplayName(componentNode: ComponentNode) {
    this.displayNameList.add(componentNode.displayName)
    componentNode.childrenNode?.forEach((child) => {
      this.addComponentDisplayName(child)
    })
  }

  static updateDisplayName(
    displayName: string,
    oldDisplayName?: string,
  ): boolean | void {
    if (this.isAlreadyGenerate(displayName)) {
      return false
    }
    if (oldDisplayName !== undefined) {
      this.removeDisplayName(oldDisplayName)
    }
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    this.displayNameList.add(displayName)
    Connection.getRoom("app", this.appId)?.send(
      getPayload(
        Signal.SIGNAL_ONLY_BROADCAST,
        Target.TARGET_DISPLAY_NAME,
        true,
        { type: UPDATE_DISPLAY_NAME, payload: [oldDisplayName, displayName] },
        teamID,
        uid,
        [],
      ),
    )
  }

  static removeDisplayName(displayName: string) {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    this.displayNameList.delete(displayName)
    Connection.getRoom("app", this.appId)?.send(
      getPayload(
        Signal.SIGNAL_ONLY_BROADCAST,
        Target.TARGET_DISPLAY_NAME,
        true,
        { type: REMOVE_DISPLAY_NAME, payload: [displayName] },
        teamID,
        uid,
        [],
      ),
    )
  }

  static removeDisplayNameMulti(displayNames: string[]) {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    displayNames.forEach((displayName) => {
      this.displayNameList.delete(displayName)
    })
    Connection.getRoom("app", this.appId)?.send(
      getPayload(
        Signal.SIGNAL_ONLY_BROADCAST,
        Target.TARGET_DISPLAY_NAME,
        true,
        { type: REMOVE_DISPLAY_NAME, payload: displayNames },
        teamID,
        uid,
        [],
      ),
    )
  }
}
