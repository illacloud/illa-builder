import { HTMLAttributes } from "react"

export type ActionRestultStatus = "success" | "error"

export interface ActionResultProps extends HTMLAttributes<HTMLDivElement> {
  result?: string
  type?: string
  status?: ActionRestultStatus
  onClose?: () => void
}
