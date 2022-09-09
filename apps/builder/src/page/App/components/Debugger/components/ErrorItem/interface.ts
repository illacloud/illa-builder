import { HTMLAttributes } from "react"
import { ErrorShape } from "@/redux/currentApp/executionTree/executionState"

export interface ErrorItemProps extends HTMLAttributes<HTMLDivElement> {
  pathName: string
  item: ErrorShape
}
