import { HTMLAttributes, ReactNode } from "react"

export interface ActionEditorPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  isActionDirty?: boolean
  onEditResource?: (id: string) => void
  onChangeResource?: (id: string) => void
  onCreateResource?: () => void
  onDeleteActionItem: (id: string) => void
  onDuplicateActionItem: (id: string) => void
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
