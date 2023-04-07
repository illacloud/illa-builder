import { cloneDeep } from "lodash"
import { flattenDslToArray } from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { batchMergeLayoutInfoToComponent } from "@/utils/drag/drag"

export const getAllComponentsWithRealShapeSelectorOnlyUseInWSAsync = (
  state: RootState,
) => {
  const canvas = cloneDeep(state.currentApp.editor.components)
  if (!canvas) return []
  const allComponents = flattenDslToArray(canvas)
  const widgetsLayoutInfo = cloneDeep(
    state.currentApp.execution.widgetsLayoutInfo,
  )

  let childrenNodes = allComponents ? cloneDeep(allComponents) : []
  if (Array.isArray(childrenNodes)) {
    const mergedChildrenNode = batchMergeLayoutInfoToComponent(
      widgetsLayoutInfo,
      childrenNodes,
    )
    childrenNodes = cloneDeep(mergedChildrenNode)
  } else {
    childrenNodes = []
  }
  return childrenNodes
}
