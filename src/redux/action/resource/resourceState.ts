import { ResourceType } from "@/page/Editor/components/ActionEditor/interface"
import { RESTAPIFormValues } from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/Resources/RESTAPI/interface"
import { MySQLFormValues } from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/Resources/MySQL/interface"

export interface Resource {
  id: string
  name: string
  type?: ResourceType
  config: MySQLFormValues | RESTAPIFormValues
}
export type ResourceListState = Resource[]
export const resourceInitialState: ResourceListState = []
