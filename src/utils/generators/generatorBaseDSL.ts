import { BaseDSL, WidgetCardInfo } from "@/wrappedComponents/interface"
import { WidgetTypeList } from "@/wrappedComponents/WidgetBuilder"
import { v4 } from "uuid"
import store from "@/store"

export const generatorBaseDSL = (
  widgetInfo: Partial<WidgetCardInfo>,
): BaseDSL => {
  let baseDSL: BaseDSL
  if (
    !widgetInfo.type ||
    typeof widgetInfo.type !== "string" ||
    !WidgetTypeList.includes(widgetInfo.type)
  ) {
    throw new Error("Widget is not registered")
  }

  if (!widgetInfo.displayName) {
    throw new Error("dsl must have displayName")
  }

  if (!widgetInfo.w || !widgetInfo.h) {
    throw new Error("dsl must have default width and height")
  }
  let childrenNodeDSL: BaseDSL[] = []
  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    widgetInfo.childrenNode.map((childNode: any) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      childrenNodeDSL.push(generatorBaseDSL(childNode))
    })
  }
  // const state = store.getState()
  // TODO: dsl selector写在 selector 里: const getWidgetMapCountSelector = createSelector([getDSLSelector],(DSL)=>{
  //   横向遍历统组件情况
  //  })
  // const widgetMapCount = getWidgetMapCountsSelector(state)
  // const count = widgetMapCount[widgetInfo.type]
  const { defaults, w, h, displayName, type } = widgetInfo
  // const DSLDisplayName = `${widgetInfo.displayName}${count+1}`
  baseDSL = {
    id: v4(),
    w,
    h,
    type,
    displayName,
    childrenNode: childrenNodeDSL.length > 0 ? childrenNodeDSL : undefined,
    props: defaults ?? {},
  }
  return baseDSL
}
