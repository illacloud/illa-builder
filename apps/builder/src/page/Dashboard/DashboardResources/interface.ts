import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceTableData {
  id: string
  name: string
  type: ResourceType
  databaseName: string
  created: string
}
