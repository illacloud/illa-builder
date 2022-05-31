import { DSLWidget } from "@/wrappedComponents/DraggableComponent/interface"
import { DslAction } from "@/redux/currentApp/editor/dsl/dslReducer"

export interface DslActionHandlerPayload {
  type: DslAction
  dslFrame: DSLWidget
}
