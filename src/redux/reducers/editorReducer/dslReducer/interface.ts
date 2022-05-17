import { DSLWidget } from "@/wrappedComponents/BaseWidget/interface"

export interface DropInfo {
  parent: Object
  hasDropped: boolean
}

export interface DslState {
  root: DSLWidget
}
