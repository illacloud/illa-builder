import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ShortcutContextProp {
  showDeleteDialog: (displayName: string[]) => void
  copyComponent: (componentNode: ComponentNode) => void
}
