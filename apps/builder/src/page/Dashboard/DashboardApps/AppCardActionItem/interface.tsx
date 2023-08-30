import { HTMLAttributes } from "react"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export interface AppCardActionItemProps extends HTMLAttributes<HTMLDivElement> {
  appInfo: DashboardApp
}
