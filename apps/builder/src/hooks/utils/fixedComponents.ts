import { ComponentTreeNode } from "@illa-public/public-types"
import { fixedChartComponent } from "./fixComponentsUtils/chart"
import { fixedContainerComponent } from "./fixComponentsUtils/container"
import { fixedDataGridComponent } from "./fixComponentsUtils/dataGrid"
import { fixedImageComponent } from "./fixComponentsUtils/image"
import { fixedLikeInputComponentDefaultValue } from "./fixComponentsUtils/likeInput"
import { fixedListComponent } from "./fixComponentsUtils/list"
import { fixedMenuComponent } from "./fixComponentsUtils/menu"

export const fixedComponentsToNewComponents = (
  componentsTree: ComponentTreeNode,
) => {
  const newComponentsTree = componentsTree ?? {}
  if (Array.isArray(newComponentsTree.childrenNode)) {
    newComponentsTree.childrenNode =
      newComponentsTree.childrenNode?.map((component) => {
        switch (component.type) {
          case "CHART": {
            return fixedChartComponent(component)
          }
          case "MENU_WIDGET": {
            return fixedMenuComponent(component)
          }
          case "LIST_WIDGET":
            return fixedListComponent(component)
          case "DATA_GRID_WIDGET":
            return fixedDataGridComponent(component)
          case "IMAGE_WIDGET":
            return fixedImageComponent(component)
          case "CONTAINER_WIDGET":
            return fixedContainerComponent(component)
          case "JSON_EDITOR_WIDGET":
          case "SLIDER_WIDGET":
          case "TEXTAREA_INPUT_WIDGET":
          case "EDITABLE_TEXT_WIDGET":
          case "NUMBER_INPUT_WIDGET":
          case "INPUT_WIDGET": {
            return fixedLikeInputComponentDefaultValue(component)
          }
          default: {
            return fixedComponentsToNewComponents(component)
          }
        }
      }) || []
  }

  return newComponentsTree
}
