import { AnyAction } from "redux"
import { DslFrame, DslText } from "../dragConfig/dsl"

export const DslActionName = {
  AddFrame: "AddFrame",
  AddText: "AddText",
  UpdateText: "UpdateText",
}

export interface AddFrame extends AnyAction {
  dslFrame: DslFrame
}

export interface AddText extends AnyAction {
  dslText: DslText
}

export interface UpdateText extends AnyAction {
  newDslText: DslText
}
