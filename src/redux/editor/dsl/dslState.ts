import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants"

export interface DropInfo {
  parent: Object
  hasDropped: boolean
}

export interface DslState {
  root: DSLWidget
}

export const DslInitialState: DslState = {
  root: {
    id: MAIN_CONTAINER_ID,
    parentId: MAIN_CONTAINER_ID,
    children: [],
    type: "CANVAS_WIDGET",
    widgetName: "Canvas",
    props: {
      version: "0.0.1",
      height: "100%",
      width: "100%",
      leftColumn: "auto",
      rightColumn: "auto",
      topRow: "auto",
      bottomRow: "auto",
      position: "absolute",
      dragDisabled: true,
    },
  },
}
