import { ResourceType } from "@/redux/resource/resourceState"

export interface MysqlLikeConfigElementProps {
  resourceType: ResourceType
  resourceID?: string
  onBack: () => void
  onFinished: (resourceID: string) => void
}
