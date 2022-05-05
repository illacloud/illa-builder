import { HTMLAttributes } from "react"

export interface QueryEditorPanelProps extends HTMLAttributes<HTMLDivElement> {
  onEditResource?: () => void
  onCreateResource?: () => void
}

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
}
