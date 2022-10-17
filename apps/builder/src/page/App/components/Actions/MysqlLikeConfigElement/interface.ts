import { ResourceType } from "@/redux/resource/resourceState"

export interface MysqlLikeConfigElementProps {
  resourceType: ResourceType
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}
