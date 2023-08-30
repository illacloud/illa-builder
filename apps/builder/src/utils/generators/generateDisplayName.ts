// string for component
import { Connection, getTextMessagePayload } from "@/api/ws"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const ADD_DISPLAY_NAME = "addDisplayName"
export const REMOVE_DISPLAY_NAME = "removeDisplayName"
export const UPDATE_DISPLAY_NAME = "updateDisplayName"
export const GENERATE_OR_UPDATE_DISPLAYNAME = "generateOrUpdateDisplayName"

export const PLACEHOLDER_DISPLAYNAME = ["document", "utils"]

export class DisplayNameGenerator {
  static displayNameList = new Set<string>(PLACEHOLDER_DISPLAYNAME)

  static appId: string = ""
  static teamID: string = ""
  static uid: string = ""

  static isAlreadyGenerate(displayName: string): boolean {
    return this.displayNameList.has(displayName)
  }

  static initApp(appId: string, teamID: string, uid: string) {
    this.appId = appId
    this.teamID = teamID
    this.uid = uid
  }

  // use when create success
  static generateDisplayName(type: string, showName?: string): string {
    let index = 1
    let name = `${showName || type}${index}`
    // check cache map
    while (this.isAlreadyGenerate(name)) {
      index = index + 1
      name = `${showName || type}${index}`
    }
    this.displayNameList.add(name)
    Connection.getTextRoom("app", this.appId)?.send(
      getTextMessagePayload(
        TextSignal.BROADCAST_ONLY,
        TextTarget.DISPLAY_NAME,
        true,
        { type: ADD_DISPLAY_NAME, payload: [name] },
        this.teamID,
        this.uid,
        [],
      ),
    )
    return name
  }

  static updateDisplayNameList(
    componentNode: ComponentNode,
    actionList: ActionItem<ActionContent>[],
  ) {
    this.displayNameList = new Set<string>(PLACEHOLDER_DISPLAYNAME)
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

  static addDisplayNames(displayNames: string[]) {
    displayNames.forEach((displayName) => {
      this.displayNameList.add(displayName)
    })
  }

  static updateOrGenerateDisplayName(displayName: string) {
    if (this.displayNameList.has(displayName)) {
      return this.generateDisplayName(displayName)
    }
    this.displayNameList.add(displayName)
    Connection.getTextRoom("app", this.appId)?.send(
      getTextMessagePayload(
        TextSignal.BROADCAST_ONLY,
        TextTarget.DISPLAY_NAME,
        true,
        {
          type: GENERATE_OR_UPDATE_DISPLAYNAME,
          payload: displayName,
        },
        this.teamID,
        this.uid,
        [],
      ),
    )
    return displayName
  }

  static removeDisplayName(displayName: string) {
    this.displayNameList.delete(displayName)
    Connection.getTextRoom("app", this.appId)?.send(
      getTextMessagePayload(
        TextSignal.BROADCAST_ONLY,
        TextTarget.DISPLAY_NAME,
        true,
        { type: REMOVE_DISPLAY_NAME, payload: [displayName] },
        this.teamID,
        this.uid,
        [],
      ),
    )
  }

  static removeDisplayNameMulti(displayNames: string[]) {
    displayNames.forEach((displayName) => {
      this.displayNameList.delete(displayName)
    })
    Connection.getTextRoom("app", this.appId)?.send(
      getTextMessagePayload(
        TextSignal.BROADCAST_ONLY,
        TextTarget.DISPLAY_NAME,
        true,
        { type: REMOVE_DISPLAY_NAME, payload: displayNames },
        this.teamID,
        this.uid,
        [],
      ),
    )
  }
}
