import { HTMLAttributes, ReactNode } from "react"
import { ActionItem } from "@/redux/action/actionList/actionListState"

export interface ActionEditorPanelProps extends HTMLAttributes<HTMLDivElement> {
  activeActionItemId: string
  onEditResource?: (id: string) => void
  onCreateResource?: () => void
  onDeleteActionItem: (id: string) => void
  onDuplicateActionItem: (id: string) => void
  children?: ReactNode
}

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
  activeActionItem?: ActionItem | null
}

export interface ResourcePanelProps {
  resourceId?: string
}
