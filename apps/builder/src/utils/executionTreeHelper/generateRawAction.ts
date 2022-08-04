import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { isObject } from "@/utils/typeHelper"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"
import { actionDisplayNameMapFetchResult } from "@/page/App/components/Actions/ActionPanel/utils/runAction"

interface RawAction {
  [key: string]: any
  run: ""
  $type: "ACTION"
  $dynamicAttrPaths: string[]
}

export const generateDynamicAttrPaths = (
  rawObj: Record<string, any>,
  dynamicAttrPaths: string[],
  parentAttr: string = "",
) => {
  for (let key in rawObj) {
    const value = rawObj[key]
    if (Array.isArray(value)) {
      value.forEach((item) => {
        generateDynamicAttrPaths(item, dynamicAttrPaths, key)
      })
    }
    if (isObject(value)) {
      generateDynamicAttrPaths(value, dynamicAttrPaths, key)
    }
    if (isDynamicString(value)) {
      const attrPath = parentAttr ? parentAttr + "." + key : key
      dynamicAttrPaths.push(attrPath)
    }
  }
}

export const generateRawAction = (
  action: ActionItem<ActionContent>,
): RawAction => {
  let $dynamicAttrPaths: string[] = []
  const { content, transformer } = action
  generateDynamicAttrPaths(action, $dynamicAttrPaths)
  return {
    transformer,
    content,
    run: "",
    $type: "ACTION",
    $dynamicAttrPaths,
  }
}
