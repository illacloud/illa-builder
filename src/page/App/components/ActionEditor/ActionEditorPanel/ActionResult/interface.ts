import { HTMLAttributes } from "react"
import { AxiosResponse } from "axios"

export type ActionResultType = AxiosResponse | string

export interface ActionResultProps extends HTMLAttributes<HTMLDivElement> {
  result?: ActionResultType
  error?: boolean
  onClose?: () => void
}
