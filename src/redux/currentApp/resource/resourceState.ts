import { DashboardResource } from "@/redux/dashboard/resources/dashboardResourceState"
import {
  RESTAPIConfigureValues,
  MySQLConfigureValues,
} from "@/page/App/components/ActionEditor/Resource"

export interface Resource extends DashboardResource {
  options: MySQLConfigureValues | RESTAPIConfigureValues
}
export type ResourceListState = Resource[]
export const resourceInitialState: ResourceListState = []
