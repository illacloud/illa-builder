import { HTMLAttributes } from "react"
import { DashboardApp } from "@/redux/currentApp/appInfo/appInfoState"

export interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export interface AppNameEditorModalProps {
  onSuccess: () => void
}

export interface AppNameProps {
  appInfo: DashboardApp
}
