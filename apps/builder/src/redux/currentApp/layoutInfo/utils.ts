import { WidgetLayoutInfo } from "./layoutInfoState"

export const getAllDescendantNodeDisplayNamesByExecution = (
  node: WidgetLayoutInfo,
  widgets: Record<string, WidgetLayoutInfo>,
) => {
  const queue = [node]
  let res: string[] = []
  while (queue.length > 0) {
    const head = queue[queue.length - 1]
    res.push(head.displayName)
    queue.pop()
    if (head.childrenNode && Array.isArray(head.childrenNode)) {
      head.childrenNode.forEach((child) => {
        if (widgets[child]) {
          queue.push(widgets[child])
        }
      })
    }
  }
  return res
}
