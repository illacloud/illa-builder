import { ResourceType } from "@/redux/resource/resourceState"

export interface MysqlConfigElementProps {
  resourceType: ResourceType
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}
