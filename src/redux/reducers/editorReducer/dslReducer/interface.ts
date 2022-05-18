import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"

export interface DropInfo {
  parent: Object
  hasDropped: boolean
}

export interface DslState {
  root: DSLWidget
}
