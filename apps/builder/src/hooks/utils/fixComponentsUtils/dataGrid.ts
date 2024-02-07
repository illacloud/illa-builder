import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedDataGridComponent = (component: ComponentTreeNode) => {
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
