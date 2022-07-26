import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionResourceSeletorProps {
  actionType?: ActionType
  defaultSelected?: string
  onBack?: () => void
  onCreateResource?: (actionType?: ActionType) => void
  onCreateAction?: (actionType?: ActionType, resourceId?: string) => void
}
