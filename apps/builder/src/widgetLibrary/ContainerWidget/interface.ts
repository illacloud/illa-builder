import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ContainerProps {
  currentViewIndex: number
  viewComponentsArray: string[][]
  componentNode: ComponentNode
}
