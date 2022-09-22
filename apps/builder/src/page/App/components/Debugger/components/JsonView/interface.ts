import { HTMLAttributes } from "react"

export interface JsonViewProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  value: unknown
  level?: number
}
