export type DraggingGroupCenter = {
  id?: string
  top?: number
  left?: number
}

export interface DragDetails {
  dragGroupActualParent?: string
  draggingGroupCenter?: DraggingGroupCenter
  newWidget?: any
  draggedOn?: string
  dragOffset?: any
}

export interface WidgetDragResizeState {
  isDraggingDisabled: boolean
  isDragging: boolean
  dragDetails: DragDetails
  isResizing: boolean
  lastSelectedWidget?: string
  focusedWidget?: string
  selectedWidgetAncestry: string[]
  selectedWidgets: string[]
}

export const WidgetDragResizeInitialState: WidgetDragResizeState = {
  isDraggingDisabled: false,
  isDragging: false,
  dragDetails: {},
  isResizing: false,
  lastSelectedWidget: undefined,
  selectedWidgets: [],
  focusedWidget: undefined,
  selectedWidgetAncestry: [],
}