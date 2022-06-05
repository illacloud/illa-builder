import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { getSelectedWidgets } from "@/redux/currentApp/editor/widgetStates/widgetStateSelector"
import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"

export const getEditorDsl = (state: RootState) => state.currentApp.editor.dsl

export const getWidgetDSL = createSelector(
  [getSelectedWidgets, getEditorDsl],
  (selectedWidgets, dsl) => {
    const selectedWidget = selectedWidgets[0]
    const current = dsl.root
    const queue = new Array<DSLWidget>()
    queue.push(current)
    while (queue.length) {
      const head = queue[queue.length - 1]

      if (head.id === selectedWidget) {
        return head
      }
      queue.pop()
      if (head.children && head.children.length) {
        queue.push(...head.children)
      }
    }
  },
)
