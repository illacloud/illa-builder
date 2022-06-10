import { HTMLAttributes } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title" | "onChange"> {
  title?: string
  activeActionItem?: ActionItem | null
  onChange?: (name: string) => void
}
