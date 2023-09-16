import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const fixedChartComponent = (component: ComponentNode) => {
  return {
    ...component,
    type: "CHART_WIDGET",
  }
}

const fixedMenuComponent = (component: ComponentNode) => {
  if (component.version === 0 || component.version == undefined) {
    return {
      ...component,
      version: 1,
      props: {
        ...component.props,
        selectedValues:
          component.props && Array.isArray(component.props?.selectedValues)
            ? `{{${JSON.stringify(component.props.selectedValues)}}}`
            : "{{[]}}",
        optionConfigureMode:
          component.props && component.props.optionConfigureMode === "dynamic"
            ? "dynamic"
            : "static",
        colorScheme:
          component.props && component.props.colorScheme
            ? component.props.colorScheme
            : "blue",
        bgColor:
          component.props && component.props.bgColor
            ? component.props.bgColor
            : "transparent",
        hoverColorScheme:
          component.props && component.props.hoverColorScheme
            ? component.props.hoverColorScheme
            : "grayBlue",
      },
    }
  }
  return component
}

export const fixedComponentsToNewComponents = (
  componentsTree: ComponentNode,
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
          default: {
            return fixedComponentsToNewComponents(component)
          }
        }
      }) || []
  }

  return newComponentsTree
}
