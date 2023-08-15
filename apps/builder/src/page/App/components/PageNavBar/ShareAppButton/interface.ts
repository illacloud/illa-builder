import {DashboardApp} from "@/redux/dashboard/apps/dashboardAppState";

export interface ShareAppButtonProps {
  canUseBillingFeature: boolean
  appInfo: DashboardApp
}