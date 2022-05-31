import { HTMLAttributes, ReactNode } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionList/actionListState"

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

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
  activeActionItem?: ActionItem | null
}

export interface ResourcePanelProps {
  resourceId?: string
  activeActionItemId?: string | null
  onChange?: () => void
  onSave?: () => void
}

export type triggerRunRef = {
  run: () => void
  saveAndRun: () => void
}
