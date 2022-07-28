import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export interface ActionTitleBarProps {
  action: ActionItem<ActionContent>
  onCopy: (action: ActionItem<ActionContent>) => void
  onDelete: (action: ActionItem<ActionContent>) => void
}
