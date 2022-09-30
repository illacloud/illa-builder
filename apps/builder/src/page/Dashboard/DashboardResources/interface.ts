import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceTableData {
  resourceType: ResourceType
  id: string
  name: string
  type: ResourceType
  databaseName: string
  created: string
}
