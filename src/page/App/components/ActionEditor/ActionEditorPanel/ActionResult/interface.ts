import { HTMLAttributes } from "react"

export type ActionResult = {
  request?: object
  response?: { [key: string]: any }
}

export interface ActionResultProps extends HTMLAttributes<HTMLDivElement> {
  actionType: string
  result?: object
  type?: string
  error?: boolean
  onClose?: () => void
}
