import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"
import { DslAction } from "@/redux/editor/dsl/dslReducer"

export interface DslActionHandlerPayload {
  type: DslAction
  dslFrame: DSLWidget
}
