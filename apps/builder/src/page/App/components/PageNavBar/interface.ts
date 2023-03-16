import { HTMLAttributes } from "react"

export interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export interface AppNameEditorModalProps {
  onSuccess: () => void
}

export interface AppNameProps {
  appName: string
}
