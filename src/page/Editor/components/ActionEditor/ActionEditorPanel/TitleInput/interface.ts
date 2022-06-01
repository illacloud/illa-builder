import { HTMLAttributes } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionList/actionListState"

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
  activeActionItem?: ActionItem | null
}
