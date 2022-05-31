import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export interface AppInfo extends Omit<DashboardApp, "appActivity"> {
  appBuilderVersion: string
  appVersion: string
}
