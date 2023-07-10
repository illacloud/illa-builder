import { parse } from "qs"
import { generateRawAction } from "@/utils/executionTreeHelper/generateRawAction"
import { generateRawWidget } from "@/utils/executionTreeHelper/generateRawWidget"
import {
  CurrentUserInfoInTree,
  RawTreeSeedShape,
  RawTreeShape,
} from "@/utils/executionTreeHelper/interface"
import { CUSTOM_STORAGE_PREFIX } from "../storage"

export const CURRENT_USER_INFO_ACCESS_LIST_KEY = [
  "userID",
  "nickname",
  "email",
  "avatar",
  "language",
  "createdAt",
  "updatedAt",
]

export class RawTreeFactory {
  static create(seeds: RawTreeSeedShape): RawTreeShape {
    const { widgets, actions, builderInfo, currentUserInfo, globalData } = seeds
    const rawTree: RawTreeShape = {} as RawTreeShape

    actions.forEach((action) => {
      rawTree[action.displayName] = generateRawAction(action)
    })

    Object.keys(widgets).forEach((key) => {
      rawTree[key] = generateRawWidget(widgets[key])
    })

    const href = window.location.href
    const query = href.split("?")[1]
    const queryArray = parse(query)

    const customStorage = localStorage[CUSTOM_STORAGE_PREFIX]

    const canShownUserInfo: CurrentUserInfoInTree = Object.keys(
      currentUserInfo,
    ).reduce((acc, key) => {
      if (
        CURRENT_USER_INFO_ACCESS_LIST_KEY.includes(key) &&
        currentUserInfo[key as keyof typeof currentUserInfo]
      ) {
        acc[key as keyof CurrentUserInfoInTree] = currentUserInfo[
          key as keyof typeof currentUserInfo
        ] as string
      }
      return acc
    }, {} as CurrentUserInfoInTree)

    rawTree.builderInfo = builderInfo
    rawTree.currentUserInfo = canShownUserInfo
    rawTree.globalData = globalData
    rawTree.urlParams = {
      query: queryArray,
      url: href,
    }
    rawTree.localStorage = customStorage ? JSON.parse(customStorage) : {}
    return rawTree
  }
}
