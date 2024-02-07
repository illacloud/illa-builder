import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedImageComponent = (component: ComponentTreeNode) => {
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
