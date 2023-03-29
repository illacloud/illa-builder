import { parse } from "qs"
import { generateRawAction } from "@/utils/executionTreeHelper/generateRawAction"
import { generateRawWidget } from "@/utils/executionTreeHelper/generateRawWidget"
import {
  RawTreeSeedShape,
  RawTreeShape,
} from "@/utils/executionTreeHelper/interface"
import { CUSTOM_STORAGE_PREFIX } from "../storage"

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

    rawTree.builderInfo = builderInfo
    rawTree.currentUserInfo = currentUserInfo
    rawTree.globalData = globalData
    rawTree.urlParams = {
      query: queryArray,
      url: href,
    }
    rawTree.localStorage = customStorage ? JSON.parse(customStorage) : {}
    return rawTree
  }
}
