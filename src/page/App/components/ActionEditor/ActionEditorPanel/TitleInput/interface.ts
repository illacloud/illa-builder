import { HTMLAttributes } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
  activeActionItem?: ActionItem | null
}
