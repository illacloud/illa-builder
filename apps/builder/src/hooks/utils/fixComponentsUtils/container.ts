import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedContainerComponent = (component: ComponentTreeNode) => {
  let linkedWidget
  if (component.props) {
    linkedWidget =
      component.props.linkWidgetDisplayName !== undefined &&
      typeof component.props.linkWidgetDisplayName === "string"
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
