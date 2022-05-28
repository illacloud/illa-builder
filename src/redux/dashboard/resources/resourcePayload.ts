import { DashboardResource } from "@/redux/dashboard/resources/resourceState"

export interface AddResourcePayload {
  resource: DashboardResource
  index?: number
}

export interface UpdateResourcePayload {
  resourceId: string
  newResource: DashboardResource
}
