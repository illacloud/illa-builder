import { HTMLAttributes, ReactNode } from "react"

export interface ActionEditorPanelProps extends HTMLAttributes<HTMLDivElement> {
  onEditResource?: () => void
  onCreateResource?: () => void
  children?: ReactNode
}

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
}
