import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionResourceSeletorProps {
  actionType?: ActionType
  loading?: boolean
  defaultSelected?: string
  onBack?: () => void
  onCreateResource?: (actionType?: ActionType) => void
  onCreateAction?: (actionType?: ActionType, resourceId?: string) => void
}
