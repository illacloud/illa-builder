import { DashboardApp } from "@/redux/currentApp/appInfo/appInfoState"

export interface AppSettingModalProps {
  appInfo: DashboardApp
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  onSaveEvent: () => void
  onCloseEvent: () => void
}
