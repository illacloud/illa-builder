import { HTMLAttributes } from "react"

export interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export type AppSizeType = "fluid" | "desktop" | "tablet" | "custom"

export interface AppNameEditorModalProps {
  onSuccess: () => void
}

export interface AppNameProps {
  appName: string
}
