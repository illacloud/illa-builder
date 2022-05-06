import { HTMLAttributes } from "react"

export interface QueryListProps extends HTMLAttributes<HTMLDivElement> { }

export interface QueryItem {
  id: string
  type: string
  name: string
  isWarning: boolean
  isUpdated: boolean
  time: string
}
