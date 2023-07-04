import { HTMLAttributes } from "react"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export interface AppNameEditorModalProps {
  onSuccess: () => void
}

export interface AppNameProps {
  appInfo: DashboardApp
}
