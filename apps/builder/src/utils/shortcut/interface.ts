import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ShortcutContextProp {
  showDeleteDialog: (displayName: string[]) => void
  copyComponentFromObject: (
    componentNode: ComponentNode[],
    offsetX?: number,
    offsetY?: number,
  ) => void
}
