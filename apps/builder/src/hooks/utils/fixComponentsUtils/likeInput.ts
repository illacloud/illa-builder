import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedLikeInputComponentDefaultValue = (
  component: ComponentTreeNode,
) => {
  return {
    ...component,
    props: {
      ...component.props,
      value: undefined,
      defaultValue: component.props?.defaultValue || "",
    },
  }
}
