import { HTMLAttributes } from "react"

export interface QueryEditorPanelProps extends HTMLAttributes<HTMLDivElement> {
  onEditResource?: () => void;
  onCreateResource?: () => void;
}
