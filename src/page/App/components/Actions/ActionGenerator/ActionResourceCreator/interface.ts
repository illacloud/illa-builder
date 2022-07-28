import { ActionType } from "@/redux/currentApp/action/actionState"
import { ActionTypeCategory } from "@/page/App/components/Actions/ActionGenerator/ActionTypeSelector/interface"

export type ConnectionRef = {
  testConnection: () => void
}

export interface ActionResourceCreatorProps {
  resourceId?: string
  category?: ActionTypeCategory
  resourceType?: ActionType
  ResourceFormEditor?: boolean
  onBack?: () => void
  onCreated?: (resourceId: string) => void
}
