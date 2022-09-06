import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface UpdateComponentsShapePayload {
  isMove: boolean
  components: ComponentNode[]
}
