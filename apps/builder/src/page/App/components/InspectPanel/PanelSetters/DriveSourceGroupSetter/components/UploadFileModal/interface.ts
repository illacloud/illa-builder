import { GCS_OBJECT_TYPE } from "@/services/drive"

export interface ObjectInfo {
  name: string
  id: string
  type: GCS_OBJECT_TYPE
}
