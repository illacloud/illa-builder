import { ComponentTreeNode } from "@illa-public/public-types"
import { isString } from "@illa-design/react"

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
  let fixedEnablePagination = true
  if (component.props) {
    fixedEnablePagination =
      component.props.enablePagination !== undefined
        ? component.props.enablePagination
        : component.props.overflowMethod === "PAGINATION"
  }
  return {
    ...component,
    props: {
      ...component.props,
      enablePagination: fixedEnablePagination,
      backgroundColor: "#ffffffbf",
    },
  }
}

const fixedDataGridComponent = (component: ComponentTreeNode) => {
  let fixedEnablePagination = true
  if (component.props) {
    fixedEnablePagination =
      component.props.enablePagination !== undefined
        ? component.props.enablePagination
        : component.props.overflowMethod === "PAGINATION"
  }
  return {
    ...component,
    props: {
      ...component.props,
      enablePagination: fixedEnablePagination,
    },
  }
}

const fixedImageComponent = (component: ComponentTreeNode) => {
  let fixedDynamicHeight = "auto"
  if (component.props) {
    fixedDynamicHeight =
      component.props.dynamicHeight !== undefined
        ? component.props.dynamicHeight
        : fixedDynamicHeight
  }
  return {
    ...component,
    props: {
      ...component.props,
      dynamicHeight: fixedDynamicHeight,
    },
  }
}

const fixedContainerComponent = (component: ComponentTreeNode) => {
  let linkedWidget
  if (component.props) {
    linkedWidget =
      component.props.linkWidgetDisplayName !== undefined &&
      isString(component.props.linkWidgetDisplayName)
        ? [component.props.linkWidgetDisplayName]
        : component.props.linkWidgetDisplayName
  }
  return {
    ...component,
    props: {
      ...component.props,
      linkWidgetDisplayName: linkedWidget,
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
          case "DATA_GRID_WIDGET":
            return fixedDataGridComponent(component)
          case "IMAGE_WIDGET":
            return fixedImageComponent(component)
          case "CONTAINER_WIDGET":
            return fixedContainerComponent(component)
          default: {
            return fixedComponentsToNewComponents(component)
          }
        }
      }) || []
  }

  return newComponentsTree
}
