import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedMenuComponent = (component: ComponentTreeNode) => {
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
