import { AnyAction } from "redux"
import { DslNode } from "./dsl"

export const MenuActionName = {
  SelectNode: "SelectNode",
}

export interface SelectNode extends AnyAction {
  selectedNode: DslNode
}
