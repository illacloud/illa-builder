import { ActionType } from "@illa-public/public-types"

export interface PanelSectionProps {
  actionTypes: ActionType[]
  changeLoading: (isLoading: boolean) => void
  filterFunc?: (actionType: ActionType) => boolean
  title: string
  hasMore: boolean
}
