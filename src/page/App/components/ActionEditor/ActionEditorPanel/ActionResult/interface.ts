import { HTMLAttributes } from "react"
import { AxiosResponse } from "axios"

export interface ActionResultProps extends HTMLAttributes<HTMLDivElement> {
  result?: AxiosResponse
  error?: boolean
  onClose?: () => void
}
