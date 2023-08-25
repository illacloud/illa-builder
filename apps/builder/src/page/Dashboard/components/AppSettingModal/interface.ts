import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export interface AppSettingModalProps {
  appInfo: DashboardApp
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  onSaveEvent: () => void
  onCloseEvent: () => void
}
