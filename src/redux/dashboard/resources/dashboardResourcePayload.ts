import { DashboardResource } from "@/redux/dashboard/resources/dashboardResourceState"

export interface AddDashboardResourcePayload {
  resource: DashboardResource
  index?: number
}

export interface UpdateDashboardResourcePayload {
  resourceId: string
  newResource: DashboardResource
}
