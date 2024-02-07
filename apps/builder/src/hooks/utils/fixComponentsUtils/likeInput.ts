import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedLikeInputComponentDefaultValue = (
  component: ComponentTreeNode,
) => {
  return {
    ...component,
    props: {
      ...component.props,
      value: "",
      defaultValue: component.props?.defaultValue || "",
    },
  }
}
