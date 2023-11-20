import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedChartComponent = (component: ComponentTreeNode) => {
  return {
    ...component,
    type: "CHART_WIDGET",
  }
}

const fixedMenuComponent = (component: ComponentTreeNode) => {
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

const fixedListComponent = (component: ComponentTreeNode) => {
  return {
    ...component,
    props: {
      ...component.props,
      enablePagination:
        component.props && component.props.overflowMethod === "PAGINATION"
          ? true
          : false,
      backgroundColor: "#ffffffbf",
    },
  }
}

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
          default: {
            return fixedComponentsToNewComponents(component)
          }
        }
      }) || []
  }

  return newComponentsTree
}
