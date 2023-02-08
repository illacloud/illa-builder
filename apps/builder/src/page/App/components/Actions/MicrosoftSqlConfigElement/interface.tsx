import { ResourceType } from "@/redux/resource/resourceState"

export interface MicrosoftSqlConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}
