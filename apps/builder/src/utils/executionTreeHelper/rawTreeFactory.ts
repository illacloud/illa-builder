import { generateRawAction } from "@/utils/executionTreeHelper/generateRawAction"
import { generateRawWidget } from "@/utils/executionTreeHelper/generateRawWidget"
import {
  RawTreeSeedShape,
  RawTreeShape,
} from "@/utils/executionTreeHelper/interface"

export class RawTreeFactory {
  static create(seeds: RawTreeSeedShape): RawTreeShape {
    const { widgets, actions, builderInfo, currentUserInfo } = seeds
    const rawTree: RawTreeShape = {} as RawTreeShape

    actions.forEach((action) => {
      rawTree[action.displayName] = generateRawAction(action)
    })

    Object.keys(widgets).forEach((key) => {
      rawTree[key] = generateRawWidget(widgets[key])
    })

    rawTree.builderInfo = builderInfo
    rawTree.currentUserInfo = currentUserInfo
    return rawTree
  }
}
