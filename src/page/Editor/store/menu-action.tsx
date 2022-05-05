import { AnyAction } from "redux"
import { DslNode } from "../dragConfig/dsl"

export const MenuActionName = {
  SelectNode: "SelectNode",
}

export interface SelectNode extends AnyAction {
  selectedNode: DslNode
}
