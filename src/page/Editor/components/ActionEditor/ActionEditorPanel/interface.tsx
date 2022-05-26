import { HTMLAttributes, ReactNode } from "react"
import { ResourceType } from "@/page/Editor/components/ActionEditor/interface"
import { ActionItem } from "@/redux/action/actionList/actionListState"

export interface ActionEditorPanelProps extends HTMLAttributes<HTMLDivElement> {
  activeActionItemId: string
  onEditResource?: (id: string) => void
  onCreateResource?: () => void
  children?: ReactNode
}

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
  activeActionItem?: ActionItem | null
}

export interface ResourcePanelProps {
  resourceId: string
}
