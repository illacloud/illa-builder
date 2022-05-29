import { HTMLAttributes, ReactNode } from "react"
import { ActionItem } from "@/redux/action/actionList/actionListState"

export interface ActionEditorPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onEditResource?: (id: string) => void
  onChangeResource?: (id: string) => void
  onCreateResource?: () => void
  onDeleteActionItem: (id: string) => void
  onDuplicateActionItem: (id: string) => void
  children?: ReactNode
  onChange: () => void
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
}

export type triggerRunRef = {
  onRun: () => void
}
