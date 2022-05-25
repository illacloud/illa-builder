import { HTMLAttributes, ReactNode } from "react"
import { ResourceType } from "@/page/Editor/components/ActionEditor/interface"

export interface ActionEditorPanelProps extends HTMLAttributes<HTMLDivElement> {
  onEditResource?: () => void
  onCreateResource?: () => void
  children?: ReactNode
}

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
}

export interface ResourcePanelProps {
  resourceType: ResourceType
}
