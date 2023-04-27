import { HTMLAttributes } from "react"

export interface JsonViewProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  value: Record<string, unknown>
  level?: number
}
