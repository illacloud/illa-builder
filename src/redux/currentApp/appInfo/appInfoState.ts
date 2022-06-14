import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export interface AppInfo extends DashboardApp {
  appBuilderVersion: string
  appVersion: string
}
