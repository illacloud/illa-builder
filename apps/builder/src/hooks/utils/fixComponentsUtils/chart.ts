import { ComponentTreeNode } from "@illa-public/public-types"

export const fixedChartComponent = (component: ComponentTreeNode) => {
  return {
    ...component,
    type: "CHART_WIDGET",
  }
}
