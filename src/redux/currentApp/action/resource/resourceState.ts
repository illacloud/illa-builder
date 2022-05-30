import { ResourceType } from "@/page/Editor/components/ActionEditor/interface"
import {
  RESTAPIConfigureValues,
  MySQLConfigureValues,
} from "@/page/Editor/components/ActionEditor/Resource"

export interface Resource {
  id: string
  name: string
  type?: ResourceType
  config: MySQLConfigureValues | RESTAPIConfigureValues
}
export type ResourceListState = Resource[]
export const resourceInitialState: ResourceListState = []
