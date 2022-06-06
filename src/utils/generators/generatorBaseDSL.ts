import { BaseDSL, WidgetCardInfo } from "@/wrappedComponents/interface"
import { WidgetTypeList } from "@/wrappedComponents/WidgetBuilder"
import { v4 } from "uuid"
import store from "@/store"

export const generatorBaseDSL = (
  widgetInfo: Omit<WidgetCardInfo, "icon" | "id">,
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

  // const state = store.getState()
  // TODO: dsl selector写在 selector 里: const getWidgetMapCountSelector = createSelector([getDSLSelector],(DSL)=>{
  //   横向遍历统组件情况
  //  })
  // const widgetMapCount = getWidgetMapCountsSelector(state)
  // const count = widgetMapCount[widgetInfo.type]
  const { defaults, ...rest } = widgetInfo
  // const displayName = `${widgetInfo.displayName}${count+1}`
  baseDSL = {
    id: v4(),
    ...rest,
    props: defaults,
  }
  return baseDSL
}
