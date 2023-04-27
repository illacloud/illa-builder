import { cloneDeep } from "lodash"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const fixedChartComponent = (component: ComponentNode) => {
  return {
    ...component,
    type: "CHART_WIDGET",
  }
}

export const fixedComponentsToNewComponents = (
  componentsTree: ComponentNode,
) => {
  const newComponentsTree = cloneDeep(componentsTree)
  newComponentsTree.childrenNode =
    newComponentsTree.childrenNode?.map((component) => {
      switch (component.type) {
        case "CHART": {
          return fixedChartComponent(component)
        }
        default: {
          return fixedComponentsToNewComponents(component)
        }
      }
    }) || []
  return newComponentsTree
}
