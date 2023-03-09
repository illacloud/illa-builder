import { get, toPath } from "lodash"
import { UpdateActionSlicePropsPayload } from "@/redux/currentApp/action/actionState"
import { UpdateComponentSlicePropsPayload } from "@/redux/currentApp/editor/components/componentsPayload"
import { isDynamicString } from "./evaluateDynamicString/utils"
import {
  convertPathToString,
  isAction,
  isWidget,
} from "./executionTreeHelper/utils"

export const changeDisplayNameHelper = (
  independenciesMap: Record<string, string[]>,
  seeds: Record<string, any>,
  oldDisplayName: string,
  newDisplayName: string,
) => {
  const updateWidgetSlice: UpdateComponentSlicePropsPayload[] = []
  const updateActionSlice: UpdateActionSlicePropsPayload[] = []
  Object.keys(independenciesMap).forEach((inDepPath) => {
    const paths = toPath(inDepPath)
    console.log("oldDisplayName", oldDisplayName)
    console.log("oldDisplayName", paths[0])
    if (oldDisplayName === paths[0]) {
      const usedPaths = independenciesMap[inDepPath]
      usedPaths.forEach((usedPath) => {
        const usedPathArray = toPath(usedPath)
        const maybeDynamicStringValue = get(seeds, usedPath)
        console.log("maybeDynamicStringValue", maybeDynamicStringValue)
        if (isDynamicString(maybeDynamicStringValue)) {
          const newDynamicStringValue = maybeDynamicStringValue.replace(
            oldDisplayName,
            newDisplayName,
          )
          const propsPath = convertPathToString(usedPathArray.slice(1))
          const seed = seeds[usedPathArray[0]]
          if (isAction(seed)) {
            updateActionSlice.push({
              displayName: usedPathArray[0],
              propsSlice: {
                [propsPath]: newDynamicStringValue,
              },
            })
          }
          if (isWidget(seed)) {
            updateWidgetSlice.push({
              displayName: usedPathArray[0],
              propsSlice: {
                [propsPath]: newDynamicStringValue,
              },
            })
          }
        }
      })
    }
  })

  return { updateWidgetSlice, updateActionSlice }
}
