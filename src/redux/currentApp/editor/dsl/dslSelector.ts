import { RootState } from "@/store"
import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"

export const getEditorDsl = (state: RootState) => state.currentApp.editor.dsl

// 调试用。
export const getSelectedWidgetStates = (state: RootState) =>
  state.currentApp.editor.widgetStates.selectedWidgets

// 调试用。
export const getWidgetStateById = (state: RootState, id?: string) => {
  const current = getEditorDsl(state).root
  const queue = new Array<DSLWidget>()
  queue.push(current)
  while (queue.length) {
    const head = queue[queue.length - 1]

    if (head.id === id) {
      return head
    }
    queue.pop()
    if (head.children && head.children.length) {
      queue.push(...head.children)
    }
  }
  return null
}
