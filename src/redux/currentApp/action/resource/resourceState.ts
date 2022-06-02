import { DashboardResource } from "@/redux/dashboard/resources/dashboardResourceState"
import {
  RESTAPIConfigureValues,
  MySQLConfigureValues,
} from "@/page/Editor/components/ActionEditor/Resource"

export interface Resource extends DashboardResource {
  config: MySQLConfigureValues | RESTAPIConfigureValues
}

export type ResourceListState = Resource[]
export const resourceInitialState: ResourceListState = []
