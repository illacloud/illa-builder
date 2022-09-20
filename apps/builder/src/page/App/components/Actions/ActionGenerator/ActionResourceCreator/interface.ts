import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceEditorProps {
  resourceId?: string
  resourceType: ResourceType
  onBack: () => void
  onCreated: (resourceId: string) => void
}
