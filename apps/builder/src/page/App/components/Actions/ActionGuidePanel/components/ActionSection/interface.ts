import { ActionType } from "@/redux/currentApp/action/actionState"

export interface PanelSectionProps {
  actionTypes: ActionType[]
  changeLoading: (isLoading: boolean) => void
  filterFunc?: (actionType: ActionType) => boolean
  title: string
  hasMore: boolean
}
