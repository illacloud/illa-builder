import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionTypeSelectorProps {
  onSelect: (item: ActionType) => void
}
