import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface UpdateComponentPayload {
  displayName: string
  baseDSL: ComponentNode
}
