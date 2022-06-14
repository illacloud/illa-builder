import { HTMLAttributes } from "react"

export type ActionRestultStatus = "success" | "error"

export type ActionResult = {
  request?: object
  response?: { [key: string]: any }
}

export interface ActionResultProps extends HTMLAttributes<HTMLDivElement> {
  actionType: string
  result?: object
  type?: string
  status?: ActionRestultStatus
  onClose?: () => void
}
