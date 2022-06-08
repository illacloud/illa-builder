import { BaseDSL } from "@/wrappedComponents/interface"

export interface ComponentsState {
  rootDsl: BaseDSL
}

export const ComponentsInitialState = {
  map: new Map(),
}
