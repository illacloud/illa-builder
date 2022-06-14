import { HTMLAttributes, ReactNode } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface ActionEditorPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  isActionDirty?: boolean
  onEditResource?: (id: string) => void
  onChangeResource?: (id: string) => void
  onCreateResource?: () => void
  onDeleteActionItem: () => void
  onDuplicateActionItem: () => void
  onUpdateActionItem: (actionId: string, data: Partial<ActionItem>) => void
  children?: ReactNode
  onChange?: () => void
  onSave?: () => void
}

export interface ActionEditorPanelContextProps {
  onLoadingActionResult?: (loading: boolean) => void
}

export type triggerRunRef = {
  run: () => void
  saveAndRun: () => void
}
